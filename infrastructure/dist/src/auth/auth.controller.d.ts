import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authLoginDto: AuthLoginDto): Promise<{
        user: {
            userId: number;
            email: string;
            role: import("../entities/role.entity").Role;
        };
        access_token: string;
    }>;
    test(): Promise<string>;
}
