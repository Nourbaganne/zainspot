import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Logger,
  Query,
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
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.register(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(
      createUserDto.email,
    );
    console.log('user', user);
    return user;
  }

  @Get(':id')
  async getUserPermissions(@Param('id') id: number) {
    return this.userService.findUserRolesAndPermissionsById(id);
  }

  @Public()
  @Permissions({ action: 'manage', subject: 'User' })
  @Get()
  async findAll(
    @PaginationParams() paginationParams: Pagination,
    @Query('name') name?: string,
    @Query('filter') filter?: string,
  ): Promise<PaginatedResource<Partial<User>>> {
    return await this.userService.findAll(paginationParams, name, filter);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
