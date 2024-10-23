import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GoldMemberEmailService } from './gold-member-email.service';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Controller('gold-member-email')
export class GoldMemberEmailController {
    constructor(
        private readonly goldMemberService: GoldMemberEmailService,
    ) { }

    @Public()
    @Post('send-verification')
    async sendVerification(
        @Body('email') email: string,
        @Res() res: Response
    ) {
        try {
            await this.goldMemberService.sendVerification(email);
            res.status(HttpStatus.OK).send('Gold Member Email sent successfully!');
        } catch (error) {
            console.error('Error sending verification email:', error.message);
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Failed to send verification email.');
        }
    }
}
