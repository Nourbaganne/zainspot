// src/sendMail/sendMail.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { SendMailDto } from './dto/sendMail.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('sendMail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Public()
  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendMail(@Body() sendMailDto: SendMailDto): Promise<{ message: string }> {
    await this.sendMailService.sendMail({
      from: sendMailDto.from,
      to: sendMailDto.to,
      cc: sendMailDto.cc,
      bcc: sendMailDto.bcc,
      subject: sendMailDto.subject,
      text: sendMailDto.text,
      html: sendMailDto.html,
      attachments: sendMailDto.attachments,
    });

    return { message: 'Mail sent successfully' };
  }
}
