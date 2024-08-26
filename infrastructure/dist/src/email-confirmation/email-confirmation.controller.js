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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationController = void 0;
const common_1 = require("@nestjs/common");
const email_confirmation_service_1 = require("./email-confirmation.service");
const public_decorator_1 = require("../decorators/public.decorator");
let EmailConfirmationController = class EmailConfirmationController {
    constructor(emailConfirmationService) {
        this.emailConfirmationService = emailConfirmationService;
    }
    async sendVerificationEmail(email, res) {
        try {
            await this.emailConfirmationService.sendVerificationLink(email);
            res.status(common_1.HttpStatus.OK).send('Verification email sent successfully!');
        }
        catch (error) {
            console.error('Error sending verification email:', error.message);
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Failed to send verification email.');
        }
    }
    async confirmEmail(token, res) {
        try {
            await this.emailConfirmationService.confirmEmail(token);
            res.status(common_1.HttpStatus.OK).send('Email confirmed successfully!');
        }
        catch (error) {
            console.error('Confirmation error:', error.message);
            if (error.message.includes('Invalid or expired token')) {
                res.status(common_1.HttpStatus.UNAUTHORIZED).send('Invalid or expired token.');
            }
            else {
                res.status(common_1.HttpStatus.BAD_REQUEST).send('Error in email confirmation.');
            }
        }
    }
};
exports.EmailConfirmationController = EmailConfirmationController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('send-verification'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "sendVerificationEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailConfirmationController.prototype, "confirmEmail", null);
exports.EmailConfirmationController = EmailConfirmationController = __decorate([
    (0, common_1.Controller)('email-confirmation'),
    __metadata("design:paramtypes", [email_confirmation_service_1.EmailConfirmationService])
], EmailConfirmationController);
//# sourceMappingURL=email-confirmation.controller.js.map