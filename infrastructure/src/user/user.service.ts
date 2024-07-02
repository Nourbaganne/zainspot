import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create(createUserDto as any as DeepPartial<User>);
    await user.save();
    console.log('user', user);

    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    delete user.password;
    return user;
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
