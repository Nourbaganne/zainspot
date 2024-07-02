import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../entities/role.enum';
import { Roles } from './roles.decorater';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        'Failed to create visitor. Please Enter a unique email.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
