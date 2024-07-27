import { Controller, Get, Query, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}


  @Public()
  @Post('send-verification')
  async sendVerificationEmail(@Body('email') email: string, @Res() res: Response) {
    try {
      await this.emailConfirmationService.sendVerificationLink(email);
      res.status(HttpStatus.OK).send('Verification email sent successfully!');
    } catch (error) {
      console.error('Error sending verification email:', error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Failed to send verification email.');
    }
  }

  @Public()
  @Get()
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.emailConfirmationService.confirmEmail(token);
      res.status(HttpStatus.OK).send('Email confirmed successfully!');
    } catch (error) {
      console.error('Confirmation error:', error.message);
      if (error.message.includes('Invalid or expired token')) {
        res.status(HttpStatus.UNAUTHORIZED).send('Invalid or expired token.');
      } else {
        res.status(HttpStatus.BAD_REQUEST).send('Error in email confirmation.');
      }
    }
  }
}

