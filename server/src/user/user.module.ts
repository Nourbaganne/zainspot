import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module';
import { RecaptchaService } from './recaptcha.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => EmailConfirmationModule),
    MulterModule.register({
      storage: diskStorage({
        destination: '../../uploads/users',
        filename: (req, file, cb) => {
          // Generate a unique filename
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, 
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Unsupported file type'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  ],
  providers: [UserService, RecaptchaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
