import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { UserService } from './user/user.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { CitiesModule } from './cities/cities.module';
import { City } from './entities/city.entity';
import { EmailModule } from './email/email.module';
import * as Joi from '@hapi/joi';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CaslModule } from './casl/casl.module';

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
        entities: [User, City, Role, Permission],
        // synchronize: true,
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
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {}
