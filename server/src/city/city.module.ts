import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from 'src/entities/city.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { TranslationModule } from 'src/translation/translation.module';

@Module({
	imports: [TypeOrmModule.forFeature([City]), TranslationModule],
	controllers: [CityController],
	providers: [CityService, StripeService],
})
export class CityModule {}
