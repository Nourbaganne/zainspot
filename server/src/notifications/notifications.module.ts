import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import EmailService from 'src/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from 'src/entities/notifications.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';
import { BirthdayService } from './birthday.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications, User])],
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailService, UserService, BirthdayService],
  exports: [NotificationsService],
})
export class NotificationsModule { }
