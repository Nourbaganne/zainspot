import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salt);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const defaultRole = await Role.findOne({ where: { role: 'zainspotter' } });
    const user = User.create({
      ...createUserDto,
      password: hashedPassword,
      isEmailConfirmed: false,
      role: defaultRole,
    });

    await User.save(user);

    delete user.password;
    return user;
  }

  async findAll(
    { page, limit = 1 }: Pagination,
    name?: string,
    filter?: string
  ): Promise<PaginatedResource<Partial<User>>> {
    let queryBuilder = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.paymentHistories', 'paymentHistories')
      .leftJoinAndSelect('user.subscriptions', 'subscriptions')
      .leftJoinAndSelect('subscriptions.city', 'city');

    if (filter) {
      queryBuilder = queryBuilder.andWhere(
        'role.role LIKE :filter',
        { filter: `%${filter}%` }
      );
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
        { name: `%${name}%` }
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

    // counts for roles
    const roleCounts = await this.userRepository
      .createQueryBuilder('user')
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
      if (roleCount.role === 'zainspotter') counts.zainspotter = +roleCount.count;
      if (roleCount.role === 'admin') counts.admin = +roleCount.count;
      if (roleCount.role === 'manager') counts.manager = +roleCount.count;
    });

    return {
      totalItems: total,
      items: users,
      page,
      size: limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      counts,
    };
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

  async remove(id: number): Promise<string> {
    const user = await User.findOne({ where: { id } });

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

  async findUserRolesAndPermissionsById(userId: number): Promise<User> {
    return User.findOne({
      where: { id: userId },
      relations: ['role', 'role.permissions'], 
    });
  }
}