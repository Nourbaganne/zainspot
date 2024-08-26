"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcrypt");
const role_entity_1 = require("../entities/role.entity");
const date_utils_1 = require("../utils/date-utils");
let UserService = class UserService {
    constructor() { }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(8);
        return bcrypt.hash(password, salt);
    }
    async register(createUserDto) {
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const defaultRole = await role_entity_1.Role.findOne({ where: { role: 'zainspotter' } });
        const existEmail = await user_entity_1.User.findOne({ where: { email: createUserDto.email } });
        if (existEmail) {
            throw new common_1.HttpException('existingEmail', common_1.HttpStatus.FORBIDDEN);
        }
        const user = user_entity_1.User.create({
            ...createUserDto,
            password: hashedPassword,
            isEmailConfirmed: false,
            role: defaultRole,
        });
        await user_entity_1.User.save(user);
        delete user.password;
        return user;
    }
    async findAll({ page, limit = 1 }, name, filter) {
        let queryBuilder = user_entity_1.User.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.paymentHistories', 'paymentHistories')
            .leftJoinAndSelect('user.subscriptions', 'subscriptions')
            .leftJoinAndSelect('subscriptions.city', 'city');
        if (filter) {
            queryBuilder = queryBuilder.andWhere('role.role LIKE :filter', {
                filter: `%${filter}%`,
            });
        }
        const total = await queryBuilder.getCount();
        if (name) {
            queryBuilder = queryBuilder.andWhere(`(user.email LIKE :name
          OR user.name LIKE :name 
          OR user.middleName LIKE :name 
          OR user.lastName LIKE :name) 
          OR CONCAT(user.name, ' ', user.middleName, ' ', user.lastName) LIKE :name 
          OR CONCAT(user.name, ' ', user.lastName) LIKE :name 
          `, { name: `%${name}%` });
        }
        queryBuilder = queryBuilder.take(limit).skip((page - 1) * limit);
        const users = await queryBuilder.getMany();
        users.forEach((user) => {
            delete user.password;
        });
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
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
            counts: counts,
            percentageChange: percentageChange,
        };
    }
    async getRoleCounts() {
        const roleCounts = await user_entity_1.User.createQueryBuilder('user')
            .select('role.role AS role')
            .addSelect('COUNT(user.id) AS count')
            .leftJoin('user.role', 'role')
            .groupBy('role.role')
            .getRawMany();
        const counts = {
            zainspotter: 0,
            admin: 0,
            manager: 0,
        };
        roleCounts.forEach((roleCount) => {
            if (roleCount.role === 'zainspotter')
                counts.zainspotter = +roleCount.count;
            if (roleCount.role === 'admin')
                counts.admin = +roleCount.count;
            if (roleCount.role === 'manager')
                counts.manager = +roleCount.count;
        });
        return counts;
    }
    async getPreviousRoleCounts() {
        const previousMonthStart = (0, date_utils_1.getStartOfPreviousMonth)();
        const previousMonthEnd = (0, date_utils_1.getEndOfPreviousMonth)();
        const previousRoleCounts = await user_entity_1.User.createQueryBuilder('user')
            .select('role.role AS role')
            .addSelect('COUNT(user.id) AS count')
            .leftJoin('user.role', 'role')
            .where('user.createdAt BETWEEN :start AND :end', {
            start: previousMonthStart,
            end: previousMonthEnd,
        })
            .groupBy('role.role')
            .getRawMany();
        const previousCounts = {
            zainspotter: 0,
            admin: 0,
            manager: 0,
        };
        previousRoleCounts.forEach((roleCount) => {
            if (roleCount.role === 'zainspotter')
                previousCounts.zainspotter = +roleCount.count;
            if (roleCount.role === 'admin')
                previousCounts.admin = +roleCount.count;
            if (roleCount.role === 'manager')
                previousCounts.manager = +roleCount.count;
        });
        return previousCounts;
    }
    calculatePercentageChange(oldCount, newCount) {
        if (oldCount === 0)
            return newCount > 0 ? 100 : 0;
        const percentageChange = ((newCount - oldCount) / oldCount) * 100;
        return parseFloat(percentageChange.toFixed(2));
    }
    async calculateRolePercentageChange() {
        const currentCounts = await this.getRoleCounts();
        const previousCounts = await this.getPreviousRoleCounts();
        const percentageChange = {
            zainspotter: this.calculatePercentageChange(previousCounts.zainspotter, currentCounts.zainspotter),
            admin: this.calculatePercentageChange(previousCounts.admin, currentCounts.admin),
            manager: this.calculatePercentageChange(previousCounts.manager, currentCounts.manager),
        };
        return percentageChange;
    }
    async findById(id) {
        const user = await user_entity_1.User.findOne({
            where: { id },
            relations: [
                'role',
                'paymentHistories',
                'subscriptions',
                'subscriptions.city',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        delete user.password;
        return user;
    }
    async findByEmail(email) {
        const user = await user_entity_1.User.findOne({
            where: { email },
            relations: [
                'role',
                'paymentHistories',
                'subscriptions',
                'subscriptions.city',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await user_entity_1.User.findOne({
            where: { id },
            relations: ['role'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (updateUserDto.password) {
            updateUserDto.password = await this.hashPassword(updateUserDto.password);
        }
        if (updateUserDto.roleId) {
            const role = await role_entity_1.Role.findOne({ where: { id: updateUserDto.roleId } });
            if (!role) {
                throw new common_1.NotFoundException(`Role with ID ${updateUserDto.roleId} not found`);
            }
            user.role = role;
        }
        Object.assign(user, updateUserDto);
        await user_entity_1.User.save(user);
        delete user.password;
        return user;
    }
    async remove(id) {
        const user = await user_entity_1.User.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await user_entity_1.User.remove(user);
        return `User with ID ${id} deleted successfully`;
    }
    async markEmailAsConfirmed(email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        user.isEmailConfirmed = true;
        await user_entity_1.User.save(user);
    }
    async findUser(userId) {
        return user_entity_1.User.findOne({
            where: { id: userId },
            relations: ['role', 'role.permissions'],
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=user.service.js.map