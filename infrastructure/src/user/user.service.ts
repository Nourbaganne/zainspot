import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salt);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = User.create({
      ...createUserDto,
      password: hashedPassword,
      isEmailConfirmed: false,
    });
    console.log('User before save:', user);
    await User.save(user);
    console.log('User after save:', user);
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await User.find();
    users.forEach(user => {
      console.log('User found:', user);
      delete user.password;
    });
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (user) {
      console.log('User found:', user);
      delete user.password;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      console.log('User found:', user);
      // Don't delete password here
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);

    console.log('User before update save:', user);
    await User.save(user);
    console.log('User after update save:', user);

    delete user.password;

    return user;
  }

  async remove(id: number): Promise<string> {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await User.remove(user);

    return `User with id ${id} deleted successfully`;
  }

  async markEmailAsConfirmed(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  
    user.isEmailConfirmed = true;
    await User.save(user);
  }
}
