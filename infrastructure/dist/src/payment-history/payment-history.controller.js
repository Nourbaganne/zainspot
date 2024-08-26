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
exports.PaymentHistoryController = void 0;
const common_1 = require("@nestjs/common");
const payment_history_service_1 = require("./payment-history.service");
const create_payment_history_1 = require("./dto/create-payment-history");
let PaymentHistoryController = class PaymentHistoryController {
    constructor(paymentHistoryService) {
        this.paymentHistoryService = paymentHistoryService;
    }
    create(createPaymentHistoryDto) {
        return this.paymentHistoryService.create(createPaymentHistoryDto);
    }
    findAll(userId) {
        return this.paymentHistoryService.findAll(userId);
    }
    findOne(id) {
        return this.paymentHistoryService.findOne(id);
    }
    remove(id) {
        return this.paymentHistoryService.remove(id);
    }
};
exports.PaymentHistoryController = PaymentHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_history_1.CreatePaymentHistoryDto]),
    __metadata("design:returntype", void 0)
], PaymentHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('detail/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentHistoryController.prototype, "remove", null);
exports.PaymentHistoryController = PaymentHistoryController = __decorate([
    (0, common_1.Controller)('payment-history'),
    __metadata("design:paramtypes", [payment_history_service_1.PaymentHistoryService])
], PaymentHistoryController);
//# sourceMappingURL=payment-history.controller.js.map