import { Module, forwardRef } from '@nestjs/common';
import { GoldMemberEmailController } from './gold-member-email.controller';
import { GoldMemberEmailService } from './gold-member-email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailService from 'src/email/email.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
          signOptions: {
            expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  controllers: [GoldMemberEmailController],
  providers: [GoldMemberEmailService, EmailService],
  exports: [GoldMemberEmailService]
})
export class GoldMemberEmailModule { }
