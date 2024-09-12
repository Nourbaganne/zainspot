import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
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
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService]
})
export class ResetPasswordModule {}
