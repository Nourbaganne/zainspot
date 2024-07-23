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
    });
    await User.save(user);
    delete user.password;

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await User.find();
    users.forEach(user => delete user.password);
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (user) {
      delete user.password;
    }
    return user;
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
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

    await User.save(user);

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
}
