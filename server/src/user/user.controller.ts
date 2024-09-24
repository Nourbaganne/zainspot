import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { Permissions } from 'src/decorators/permissions.decorator';
import {
  Pagination,
  PaginationParams,
} from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) { }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.register(createUserDto);
      await this.emailConfirmationService.sendVerificationLink(
        createUserDto.email,
      );
      return {
        body: user,
        message: 'Registration successful' 
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Permissions({ action: 'read', subject: 'user' })
  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return this.userService.findUser(id);
  }


  @Get()
  async findAll(
    @PaginationParams() paginationParams: Pagination,
    @Query('name') name?: string,
    @Query('filter') filter?: string,
  ): Promise<PaginatedResource<Partial<User>>> {
    return await this.userService.findAll(paginationParams, name, filter);
  }

  @Permissions({ action: 'update', subject: 'user' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Public()
  @Permissions({ action: 'delete', subject: 'user' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
