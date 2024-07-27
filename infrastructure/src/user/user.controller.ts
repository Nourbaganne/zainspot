import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) { }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.register(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(createUserDto.email);
    return user
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
