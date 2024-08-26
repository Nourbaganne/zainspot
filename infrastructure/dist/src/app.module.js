"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const data_source_1 = require("../db/data-source");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const Joi = require("@hapi/joi");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const cities_module_1 = require("./cities/cities.module");
const email_module_1 = require("./email/email.module");
const email_confirmation_module_1 = require("./email-confirmation/email-confirmation.module");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const payment_history_module_1 = require("./payment-history/payment-history.module");
const invoices_module_1 = require("./invoices/invoices.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const subscription_module_1 = require("./subscription/subscription.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
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
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            cities_module_1.CitiesModule,
            email_module_1.EmailModule,
            email_confirmation_module_1.EmailConfirmationModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            payment_history_module_1.PaymentHistoryModule,
            invoices_module_1.InvoicesModule,
            subscription_module_1.SubscriptionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map