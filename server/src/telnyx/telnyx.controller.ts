import { Controller, Post, Body } from '@nestjs/common';
import { TelnyxService } from '../telnyx/telnyx.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('verification')
export class TelnyxController {
    constructor(private readonly telnyxService: TelnyxService) {}
  
    @Public()
    @Post('send-code')
    async sendVerificationCode(@Body() body: { phoneNumber: string, code: string }) {
      const { phoneNumber, code } = body;
      await this.telnyxService.sendVerificationCode(phoneNumber, code);
      return { message: 'Verification code sent successfully' };
    }
  }
