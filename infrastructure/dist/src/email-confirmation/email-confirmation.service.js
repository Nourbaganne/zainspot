"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailConfirmationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
const user_service_1 = require("../user/user.service");
let EmailConfirmationService = EmailConfirmationService_1 = class EmailConfirmationService {
    constructor(jwtService, emailService, userService) {
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.userService = userService;
        this.logger = new common_1.Logger(EmailConfirmationService_1.name);
    }
    async sendVerificationLink(email) {
        const payload = { email };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
        });
        const frontendUrl = `${process.env.FRONTEND_URL}/email-confirmation?token=${token}`;
        const text = `Welcome to the Zainspott application. To confirm your email address, please click here: ${frontendUrl}`;
        try {
            await this.emailService.sendMail({
                to: email,
                subject: 'Email confirmation',
                text,
            });
            this.logger.log(`Verification email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send verification email to ${email}`, error.stack);
            throw new Error('Failed to send verification email');
        }
    }
    async confirmEmail(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            });
            const user = await this.userService.findByEmail(payload.email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.userService.markEmailAsConfirmed(payload.email);
            this.logger.log(`Email confirmed for ${payload.email}`);
        }
        catch (error) {
            if (error.message.includes('invalid signature')) {
                throw new Error('Invalid or expired token.');
            }
            this.logger.error(`Email confirmation failed: ${error.message}`, error.stack);
            throw new Error('Email confirmation failed');
        }
    }
};
exports.EmailConfirmationService = EmailConfirmationService;
exports.EmailConfirmationService = EmailConfirmationService = EmailConfirmationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_service_1.default,
        user_service_1.UserService])
], EmailConfirmationService);
//# sourceMappingURL=email-confirmation.service.js.map