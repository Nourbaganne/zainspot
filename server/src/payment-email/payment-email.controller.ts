import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PaymentEmailService } from './payment-email.service';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Controller('payment-email')
export class PaymentEmailController {
    constructor(
        private readonly paymentEmailService: PaymentEmailService,
    ) { }


    @Public()
    @Post('send-alert')
    async sendAlert(
        @Body('email') email: string,
        @Res() res: Response
    ) {
        try {
            await this.paymentEmailService.sendAlert(email);
            res.status(HttpStatus.OK).send('payment email sent successfully!');
        } catch (error) {
            console.error('Error sending payment email:', error.message);
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Failed to send  payment email.');

        }
    }
}
