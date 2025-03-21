import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from 'src/entities/city.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { TranslationModule } from 'src/translation/translation.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Notifications } from 'src/entities/notifications.entity';
import EmailService from 'src/email/email.service';

@Module({
	imports: [TypeOrmModule.forFeature([City, Notifications]), TranslationModule],
	controllers: [CityController],
	providers: [CityService, StripeService, NotificationsService, EmailService],
})
export class CityModule {}
