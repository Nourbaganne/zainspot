import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailConfirmationService } from './email-confirmation.service';
import EmailService from '../email/email.service';
import { UserModule } from '../user/user.module';
import { EmailConfirmationController } from './email-confirmation.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
        signOptions: { expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s` },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    forwardRef(() => UserModule), 
  ],
  providers: [EmailConfirmationService, EmailService],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController]
}) 
export class EmailConfirmationModule {}
