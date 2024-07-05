import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const user = User.create({ email, password, role: role });
    await User.save(user);
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
  // async findById(id: number): Promise<User> {
  //   return User.findOne({ where: { id } });
  // }

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
