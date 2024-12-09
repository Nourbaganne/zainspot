import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module';
import { RecaptchaService } from './recaptcha.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => EmailConfirmationModule),
	],
	exports: [UserService],
	providers: [UserService, RecaptchaService],
	controllers: [UserController],
})
export class UserModule {}
