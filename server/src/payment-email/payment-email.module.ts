import { forwardRef, Module } from '@nestjs/common';
import { PaymentEmailController } from './payment-email.controller';
import { PaymentEmailService } from './payment-email.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailService from 'src/email/email.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
          signOptions: {
            expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}`
          }
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  controllers: [PaymentEmailController],
  providers: [PaymentEmailService, EmailService],
  exports: [PaymentEmailService]
})
export class PaymentEmailModule { }
