import { Role } from 'src/entities/role.entity';
export declare class AuthLoginDto {
    email: string;
    password: string;
    role: Role[];
}
