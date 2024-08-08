import { dataSourceOptions } from './db/data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CitiesModule } from './cities/cities.module';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';

import { User } from './entities/user.entity';
import { City } from './entities/city.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { PaymentHistory } from './entities/payment-history.entity';
import { Invoices } from './entities/invoices.entity';
import { InvoicesModule } from './invoices/invoices.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { Subscription } from './entities/subscription.entity';

@Module({
  imports: [
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, City, Role, Permission, PaymentHistory, Invoices, Subscription],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CitiesModule,
    EmailModule,
    EmailConfirmationModule,
    RoleModule,
    PermissionModule,
    PaymentHistoryModule,
    InvoicesModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
