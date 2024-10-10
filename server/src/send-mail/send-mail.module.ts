
import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { SendMailController } from './send-mail.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SendMailService],
  controllers: [SendMailController],
})
export class SendMailModule {}
