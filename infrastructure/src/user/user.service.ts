import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role, businessNumber, businessName, tradeName, businessType, country, city, businessWebsite, state, interestRegion, name, middleName, lastName, gender, birthday, mediaProfile } = createUserDto;


    const user = User.create({ email, password, role: role, businessNumber, businessName, tradeName, businessType, country, city, businessWebsite, state, interestRegion, name, middleName, lastName, gender, birthday, mediaProfile });
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    await User.save(user);

    delete user.password;

    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await User.remove(user);
  }
}
