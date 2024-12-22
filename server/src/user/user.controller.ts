import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Patch,
	Delete,
	Query,
	HttpException,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import {
	Pagination,
	PaginationParams,
} from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { User } from 'src/entities/user.entity';
import { RecaptchaService } from './recaptcha.service';
import { Permissions } from 'src/decorators/permissions.decorator';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly recaptchaService: RecaptchaService,
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	@Public()
	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		try {
			// Validate reCAPTCHA token
			const isRecaptchaValid = await this.recaptchaService.validateRecaptcha(
				createUserDto.recaptcha,
			);

			if (!isRecaptchaValid) {
				throw new HttpException(
					'reCAPTCHA validation failed',
					HttpStatus.BAD_REQUEST,
				);
			}

			// const stripeCustomerId = await this.stripeService.createCustomer(
			// 	createUserDto.name,
			// 	createUserDto.email,
			// );
			// createUserDto.stripeCustomerId = stripeCustomerId;

			// Proceed with user registration
			const user = await this.userService.register(createUserDto);

			// Send email confirmation
			await this.emailConfirmationService.sendVerificationLink(
				createUserDto.email,
			);

			return {
				body: user,
				message: 'Registration successful',
			};
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				console.error('Registration error:', error);
				throw new HttpException(
					'Registration failed',
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}
		}
	}

	@Get('userStats')
	async getUsersStats(): Promise<{
		totalUsers: number;
		yearlyCounts: { year: number; count: number; incrementPercentage: number };
		monthlyCounts: {
			month: number;
			count: number;
			incrementPercentage: number;
		};
	}> {
		return this.userService.getUsersStats();
	}

	@Get(':id')
	async findUserById(@Param('id') id: number) {
		return this.userService.findUser(id);
	}

	@Get()
	async findAll(
		@PaginationParams() paginationParams: Pagination,
		@Query('name') name?: string,
		@Query('filter') filter?: string,
	): Promise<PaginatedResource<Partial<User>>> {
		return await this.userService.findAll(paginationParams, name, filter);
	}

	@Permissions({ action: 'update', subject: 'user' })
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Permissions({ action: 'delete', subject: 'user' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		const user = await this.userService.findUser(+id);

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		// Cascade delete will automatically handle the deletion of subscriptions and payment history
		return this.userService.remove(+id);
	}

	@Patch(':id/2FactorEmailActivation')
	async user2FEmailActivation(@Param('id') id: number) {
		return this.userService.user2FEmailActivation(id);
	}

	@Patch(':id/activation')
	async usersActivation(@Param('id') id: number, @Body('ids') ids: number[]) {
		// Validate IDs in the body
		const validIds = ids.filter((id) => Number.isInteger(id) && !isNaN(id));

		if (validIds.length === 0) {
			throw new BadRequestException('No valid user IDs provided');
		}

		return this.userService.usersActivation(validIds);
	}
}
