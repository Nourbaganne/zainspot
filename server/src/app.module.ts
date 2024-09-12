import { dataSourceOptions } from '../db/data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';

import { InvoiceModule } from './invoice/invoice.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SubscriptionModule } from './subscription/subscription.module';
import { ContactModule } from './contact/contact.module';
import { TelnyxModule } from './telnyx/telnyx.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100,
			},
		]),
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
				JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
				EMAIL_CONFIRMATION_URL: Joi.string().required(),
				EMAIL_SERVICE: Joi.string().required(),
				EMAIL_USER: Joi.string().required(),
				EMAIL_PASSWORD: Joi.string().required(),
			}),
		}),
		TypeOrmModule.forRoot(dataSourceOptions),
		AuthModule,
		UserModule,
		CityModule,
		EmailModule,
		EmailConfirmationModule,
		RoleModule,
		PermissionModule,
		PaymentHistoryModule,
		InvoiceModule,
		SubscriptionModule,
		ContactModule,
		TelnyxModule,
		ResetPasswordModule,
	
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
