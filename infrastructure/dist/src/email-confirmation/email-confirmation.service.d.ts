import { JwtService } from '@nestjs/jwt';
import EmailService from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
export declare class EmailConfirmationService {
    private readonly jwtService;
    private readonly emailService;
    private readonly userService;
    private readonly logger;
    constructor(jwtService: JwtService, emailService: EmailService, userService: UserService);
    sendVerificationLink(email: string): Promise<void>;
    confirmEmail(token: string): Promise<void>;
}
