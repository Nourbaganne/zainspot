import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(authLoginDto: AuthLoginDto): Promise<{
        user: {
            userId: number;
            email: string;
            role: import("../entities/role.entity").Role;
        };
        access_token: string;
    }>;
    validateUser(authLoginDto: AuthLoginDto): Promise<import("../entities/user.entity").User>;
}
