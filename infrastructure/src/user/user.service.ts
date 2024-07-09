import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const user = User.create({ email, password, role: role });
    await User.save(user);

    delete user.password;

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });
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

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
