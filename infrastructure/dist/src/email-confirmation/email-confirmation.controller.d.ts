import { EmailConfirmationService } from './email-confirmation.service';
import { Response } from 'express';
export declare class EmailConfirmationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    sendVerificationEmail(email: string, res: Response): Promise<void>;
    confirmEmail(token: string, res: Response): Promise<void>;
}
