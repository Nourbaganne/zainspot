"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const email_confirmation_service_1 = require("./email-confirmation.service");
const email_service_1 = require("../email/email.service");
const user_module_1 = require("../user/user.module");
const email_confirmation_controller_1 = require("./email-confirmation.controller");
let EmailConfirmationModule = class EmailConfirmationModule {
};
exports.EmailConfirmationModule = EmailConfirmationModule;
exports.EmailConfirmationModule = EmailConfirmationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => {
                    return {
                        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
                        signOptions: {
                            expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [email_confirmation_service_1.EmailConfirmationService, email_service_1.default],
        exports: [email_confirmation_service_1.EmailConfirmationService],
        controllers: [email_confirmation_controller_1.EmailConfirmationController],
    })
], EmailConfirmationModule);
//# sourceMappingURL=email-confirmation.module.js.map