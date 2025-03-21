import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import {
	getEndOfPreviousMonth,
	getStartOfPreviousMonth,
} from 'src/utils/date-utils';
import { In } from 'typeorm';
import * as fuzzy from 'fuzzy';
import { Notifications } from 'src/entities/notifications.entity';

type RoleCounts = Record<string, number>;
type PercentageChange = Record<string, number>;

@Injectable()
export class UserService {
	constructor() { }

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(8);
		return bcrypt.hash(password, salt);
	}

	async register(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await this.hashPassword(createUserDto.password);
		const defaultRole = await Role.findOne({ where: { name: 'zainspotter' } });

		const existEmail = await User.findOne({
			where: { email: createUserDto.email },
		});
		if (existEmail) {
			throw new HttpException('Email already exists!', HttpStatus.BAD_REQUEST);
		}

		const user = new User();

		Object.assign(user, createUserDto);

		user.email = createUserDto.email;
		user.password = hashedPassword;
		user.isEmailConfirmed = false;
		user.role = defaultRole;
		user.tradeName = this.normalizeName(createUserDto.tradeName);
		user.businessName = this.normalizeName(createUserDto.businessName);

		await user.save();

		const notifications = new Notifications();
		notifications.user = user;
		await notifications.save();

		delete user.password;
		return user;
	}


	async suiteNumberVerification(user: User) {
		// Find users in the same company
		const existingUsers = await User.createQueryBuilder('user')
			.leftJoin('user.subscriptions', 'subscription')
			.where('user.zipCode = :zipCode', { zipCode: user.zipCode })
			.andWhere('subscription.id IS NOT NULL')
			.getMany();

		// Initialize default suite number
		user.suiteNumber = 'Z01';

		if (existingUsers.length > 0) {
			const lastSuiteNumber = existingUsers[0].suiteNumber;

			// Check if lastSuiteNumber is not null before parsing
			if (lastSuiteNumber) {
				const numericPart = parseInt(lastSuiteNumber.slice(1), 10);
				const newSuiteNumber = (numericPart + 1).toString().padStart(2, '0');
				user.suiteNumber = `Z${newSuiteNumber}`;
			}

			// Fuzzy matching check for tradeName
			const tradeNames = existingUsers.map(
				(existingUser) => existingUser.tradeName,
			);
			const results = fuzzy.filter(user.tradeName, tradeNames);

			// If there's a close match, log or handle it
			if (results.length > 0) {
				const closestMatch = results[0];
				const matchScore = closestMatch.score; // Get the score of the closest match

				// Define a threshold for fuzzy matching (e.g., 0.5 for 50% similarity)
				const threshold = 0.9; // Adjust as necessary

				if (matchScore >= threshold) {
					console.log(
						`Fuzzy match found: ${closestMatch.string} with score ${matchScore}`,
					);
					// Additional logic can be placed here, like notifying the user or logging
				}
			}
		}

		await User.save(user);
	}

	normalizeName(name: string): string {
		const abbreviations: { [key: string]: string } = {
			co: 'company',
			inc: 'incorporated',
			ltd: 'limited',
			corp: 'corporation',
			llc: 'limited liability company',
		};

		// Remove special characters and extra spaces
		let normalized = name
			.replace(/[^\w\s]/g, '')
			.replace(/\s+/g, ' ')
			.trim()
			.toLowerCase();

		// check for words abbreviations
		const words = normalized.split(' ');
		normalized = words.map((word) => abbreviations[word] || word).join(' ');

		return normalized;
	}

	async findAll(
		{ page, limit = 1 }: Pagination,
		name?: string,
		filter?: string,
	): Promise<PaginatedResource<Partial<User>>> {
		let queryBuilder = User.createQueryBuilder('user')
			.leftJoinAndSelect('user.role', 'role')
			.leftJoinAndSelect('user.paymentHistories', 'paymentHistories')
			.leftJoinAndSelect('user.subscriptions', 'subscriptions')
			.leftJoinAndSelect('subscriptions.city', 'city')
			.leftJoinAndSelect('user.notifications', 'notifications');

		if (filter) {
			queryBuilder = queryBuilder.andWhere('role.name LIKE :filter', {
				filter: `%${filter}%`,
			});
		}

		// Get the total count of filtered results before applying pagination
		const total = await queryBuilder.getCount();

		// Apply the name filter globally
		if (name) {
			queryBuilder = queryBuilder.andWhere(
				`(user.email LIKE :name
          OR user.name LIKE :name 
          OR user.middleName LIKE :name 
          OR user.lastName LIKE :name) 
          OR CONCAT(user.name, ' ', user.middleName, ' ', user.lastName) LIKE :name 
          OR CONCAT(user.name, ' ', user.lastName) LIKE :name 
          `,
				{ name: `%${name}%` },
			);
		}

		// Applying pagination
		queryBuilder = queryBuilder.take(limit).skip((page - 1) * limit);
		const users = await queryBuilder.getMany();

		// Remove passwords from user objects
		users.forEach((user) => {
			delete user.password;
		});

		// Calculate pagination details
		const totalPages = Math.ceil(total / limit);
		const hasNextPage = page < totalPages;
		const hasPreviousPage = page > 1;

		// Counts for roles and percentage change
		const counts = await this.getRoleCounts();
		const percentageChange = await this.calculateRolePercentageChange();

		return {
			totalItems: total,
			items: users,
			page,
			size: limit,
			totalPages,
			hasNextPage,
			hasPreviousPage,
			counts: counts as RoleCounts, // Cast to RoleCounts
			percentageChange: percentageChange as PercentageChange, // Cast to PercentageChange
		};
	}

	async getUsersStats(): Promise<{
		totalUsers: number;
		yearlyCounts: {
			year: number;
			count: number;
			incrementPercentage: number;
			monthlyBreakdown: { month: string; count: number }[];
		};
		monthlyCounts: { month: number; count: number; incrementPercentage: number };
	}> {
		const totalUsers = await User.createQueryBuilder('user').getCount();

		// Get current year and month
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
		const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

		// Get yearly data for the current year
		const yearlyData = await User.createQueryBuilder('user')
			.select('YEAR(user.createdAt)', 'year')
			.addSelect('COUNT(user.id)', 'count')
			.where('YEAR(user.createdAt) = :currentYear', { currentYear })
			.groupBy('YEAR(user.createdAt)')
			.getRawOne<{ year: number; count: number }>();

		const totalUsersLastYear = await User.createQueryBuilder('user')
			.select('COUNT(user.id)', 'count')
			.where('YEAR(user.createdAt) = :lastYear', { lastYear: currentYear - 1 })
			.getRawOne<{ count: number }>();

		const yearlyIncrementPercentage =
			totalUsersLastYear?.count > 0
				? ((yearlyData?.count || 0 - totalUsersLastYear.count) /
					totalUsersLastYear.count) *
				100
				: 0;

		// Monthly breakdown for the current year
		const rawYearlyData = await User.createQueryBuilder('user')
			.select('MONTH(user.createdAt)', 'month')
			.addSelect('COUNT(user.id)', 'count')
			.where('YEAR(user.createdAt) = :currentYear', { currentYear })
			.groupBy('MONTH(user.createdAt)')
			.orderBy('MONTH(user.createdAt)', 'ASC')
			.getRawMany<{ month: number; count: number }>();

		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const monthlyBreakdown = Array.from({ length: 12 }).map((_, index) => {
			const monthData = rawYearlyData.find((data) => data.month === index + 1);
			return {
				month: months[index],
				count: monthData ? monthData.count : 0,
			};
		});

		// Get monthly data for current and previous month
		const monthlyData = await User.createQueryBuilder('user')
			.select('MONTH(user.createdAt)', 'month')
			.addSelect('COUNT(user.id)', 'count')
			.where(
				`(YEAR(user.createdAt) = :currentYear AND MONTH(user.createdAt) = :currentMonth)
			   OR (YEAR(user.createdAt) = :previousYear AND MONTH(user.createdAt) = :previousMonth)`,
				{ currentYear, currentMonth, previousYear, previousMonth },
			)
			.groupBy('MONTH(user.createdAt)')
			.orderBy('MONTH(user.createdAt)', 'ASC')
			.getRawMany<{ month: number; count: number }>();

		const currentMonthData = monthlyData.find(
			(data) => data.month === currentMonth,
		);
		const previousMonthData = monthlyData.find(
			(data) => data.month === previousMonth,
		);

		const monthlyIncrementPercentage =
			previousMonthData?.count > 0
				? ((currentMonthData?.count || 0 - previousMonthData.count) /
					previousMonthData.count) *
				100
				: 0;

		return {
			totalUsers,
			yearlyCounts: {
				year: currentYear,
				count: yearlyData?.count || 0,
				incrementPercentage: parseFloat(yearlyIncrementPercentage.toFixed(2)),
				monthlyBreakdown,
			},
			monthlyCounts: {
				month: currentMonth,
				count: currentMonthData?.count || 0,
				incrementPercentage: parseFloat(monthlyIncrementPercentage.toFixed(2)),
			},
		};
	}

	async getRoleCounts(): Promise<RoleCounts> {
		const roleCounts = await User.createQueryBuilder('user')
			.select('role.name AS role')
			.addSelect('COUNT(user.id) AS count')
			.leftJoin('user.role', 'role')
			.groupBy('role.name')
			.getRawMany();

		const counts: RoleCounts = {};

		// Dynamically add role counts to the object
		roleCounts.forEach((roleCount) => {
			counts[roleCount.role] = +roleCount.count;
		});

		return counts;
	}

	async getPreviousRoleCounts(): Promise<RoleCounts> {
		const previousMonthStart = getStartOfPreviousMonth();
		const previousMonthEnd = getEndOfPreviousMonth();

		const previousRoleCounts = await User.createQueryBuilder('user')
			.select('role.name AS role')
			.addSelect('COUNT(user.id) AS count')
			.leftJoin('user.role', 'role')
			.where('user.createdAt BETWEEN :start AND :end', {
				start: previousMonthStart,
				end: previousMonthEnd,
			})
			.groupBy('role.name')
			.getRawMany();

		const previousCounts: RoleCounts = {};

		// Dynamically add role counts to the object
		previousRoleCounts.forEach((roleCount) => {
			previousCounts[roleCount.role] = +roleCount.count;
		});

		return previousCounts;
	}

	private calculatePercentageChange(
		oldCount: number,
		newCount: number,
	): number {
		if (oldCount === 0) return newCount > 0 ? 100 : 0;
		const percentageChange = ((newCount - oldCount) / oldCount) * 100;
		return parseFloat(percentageChange.toFixed(2));
	}

	async calculateRolePercentageChange(): Promise<PercentageChange> {
		const currentCounts = await this.getRoleCounts();
		const previousCounts = await this.getPreviousRoleCounts();

		const percentageChange: PercentageChange = {};

		// Iterate over each role in currentCounts to dynamically calculate percentage change
		for (const role of Object.keys(currentCounts)) {
			const oldCount = previousCounts[role] || 0; // Default to 0 if the role didn't exist previously
			const newCount = currentCounts[role];

			percentageChange[role] = this.calculatePercentageChange(
				oldCount,
				newCount,
			);
		}

		return percentageChange;
	}

	async findById(id: number): Promise<User> {
		const user = await User.findOne({
			where: { id },
			relations: [
				'role',
				'paymentHistories',
				'subscriptions',
				'subscriptions.city',
			],
		});
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		delete user.password;
		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await User.findOne({
			where: { email },
			relations: [
				'role',
				'role.permissions',
				'paymentHistories',
				'subscriptions',
				'subscriptions.city',
			],
		});
		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}
		return user;
	}
	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await User.findOne({
			where: { id },
			relations: ['role'],
		});

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		if (updateUserDto.password) {
			updateUserDto.password = await this.hashPassword(updateUserDto.password);
		}

		if (updateUserDto.roleId) {
			const role = await Role.findOne({ where: { id: updateUserDto.roleId } });
			if (!role) {
				throw new NotFoundException(
					`Role with ID ${updateUserDto.roleId} not found`,
				);
			}
			user.role = role;
		}

		Object.assign(user, updateUserDto);

		await User.save(user);

		delete user.password;
		return user;
	}

	async findOne(userId: number): Promise<User> {
		const user = await User.findOneBy({ id: userId });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async remove(id: number): Promise<string> {
		const user = await User.findOne({
			where: { id },
			relations: ['paymentHistories', 'subscriptions'],
		});

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		await User.remove(user);
		return `User with ID ${id} deleted successfully`;
	}

	async markEmailAsConfirmed(email: string): Promise<void> {
		const user = await this.findByEmail(email);
		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		user.isEmailConfirmed = true;
		await User.save(user);
	}

	async findUser(userId: number): Promise<User> {
		return User.findOne({
			where: { id: userId },
			relations: ['role', 'role.permissions'],
		});
	}

	async user2FEmailActivation(id: number): Promise<User> {
		const user = await this.findById(id);

		user.EmailAuthentication = !user.EmailAuthentication;

		await User.save(user);
		return user;
	}

	async storeTwoFactorCode(userId: number, code: string): Promise<void> {
		const user = await this.findById(userId);
		user.twoFactorCode = code;
		user.twoFactorCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		try {
			await User.save(user);
			console.log('Stored 2FA Code:', user.twoFactorCode);
			console.log('2FA Code Expiration Time:', user.twoFactorCodeExpiresAt);
		} catch (error) {
			console.error('Error saving user:', error);
		}
	}

	async getTwoFactorCode(userId: number): Promise<string | null> {
		const user = await this.findById(userId);

		if (
			user.twoFactorCodeExpiresAt &&
			user.twoFactorCodeExpiresAt > new Date()
		) {
			return user.twoFactorCode;
		}
		return null;
	}

	async clearTwoFactorCode(userId: number): Promise<void> {
		const user = await this.findById(userId);
		user.twoFactorCode = null;
		user.twoFactorCodeExpiresAt = null;
		await User.save(user);
	}

	// Service method
	async findByIds(ids: number[]): Promise<User[]> {
		// Log IDs to debug
		console.log('findByIds called with IDs:', ids);

		// Filter out invalid IDs (non-numbers or NaN)
		const validIds = ids.filter((id) => Number.isInteger(id));

		if (validIds.length === 0) {
			throw new NotFoundException('No valid user IDs provided');
		}

		const users = await User.find({
			where: { id: In(validIds) },
			relations: [
				'role',
				'paymentHistories',
				'subscriptions',
				'subscriptions.city',
			],
		});

		if (users.length !== validIds.length) {
			const foundIds = users.map((user) => user.id);
			const missingIds = validIds.filter((id) => !foundIds.includes(id));
			throw new NotFoundException(
				`Users with IDs ${missingIds.join(', ')} not found`,
			);
		}

		users.forEach((user) => delete user.password);

		return users;
	}

	async usersActivation(ids: number[]): Promise<User[]> {
		if (!Array.isArray(ids) || ids.length === 0) {
			throw new BadRequestException('No user IDs provided');
		}

		const users = await this.findByIds(ids);

		users.forEach((user) => {
			user.activation = !user.activation;
		});

		await User.save(users);

		return users;
	}


	async findUsersWithBirthday(month: number, day: number): Promise<User[]> {
		return await User.createQueryBuilder('user')
			.where('MONTH(user.birthday) = :month', { month })
			.andWhere('DAY(user.birthday) = :day', { day })
			.getMany();
	}


}
