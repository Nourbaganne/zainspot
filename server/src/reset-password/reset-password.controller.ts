import { BadRequestException, Body, Controller, HttpStatus, NotFoundException, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResetPasswordService } from './reset-password.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private readonly resetPasswordService: ResetPasswordService) {}

    @Public()
    @Post('request')
    async requestReset(@Body('email') email: string) {
        try {
            await this.resetPasswordService.sendRequestEmail(email);
            return { message: 'Reset link sent' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new BadRequestException('An error occurred while processing your request');
        }
    }

    @Public()
    @Post('reset')
    async resetPassword(
        @Body('token') token: string,
        @Body('newPassword') newPassword: string,
        @Res() res: Response
    ) {
        try {
            await this.resetPasswordService.resetPassword(token, newPassword);
            res.status(HttpStatus.OK).send('Password reset successfully!');
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}
