import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { User } from 'src/entities/user.entity';
export declare class UserController {
    private readonly userService;
    private readonly emailConfirmationService;
    private readonly logger;
    constructor(userService: UserService, emailConfirmationService: EmailConfirmationService);
    register(createUserDto: CreateUserDto): Promise<User>;
    findUserById(id: number): Promise<User>;
    findAll(paginationParams: Pagination, name?: string, filter?: string): Promise<PaginatedResource<Partial<User>>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<string>;
}
