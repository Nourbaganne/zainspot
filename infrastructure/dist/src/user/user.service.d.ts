import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
type RoleCounts = {
    zainspotter: number;
    admin: number;
    manager: number;
};
type PercentageChange = {
    zainspotter: number;
    admin: number;
    manager: number;
};
export declare class UserService {
    constructor();
    hashPassword(password: string): Promise<string>;
    register(createUserDto: CreateUserDto): Promise<User>;
    findAll({ page, limit }: Pagination, name?: string, filter?: string): Promise<PaginatedResource<Partial<User>>>;
    getRoleCounts(): Promise<RoleCounts>;
    getPreviousRoleCounts(): Promise<RoleCounts>;
    private calculatePercentageChange;
    calculateRolePercentageChange(): Promise<PercentageChange>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<string>;
    markEmailAsConfirmed(email: string): Promise<void>;
    findUser(userId: number): Promise<User>;
}
export {};
