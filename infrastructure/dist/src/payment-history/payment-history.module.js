"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_history_service_1 = require("./payment-history.service");
const payment_history_controller_1 = require("./payment-history.controller");
const payment_history_entity_1 = require("../entities/payment-history.entity");
const user_entity_1 = require("../entities/user.entity");
let PaymentHistoryModule = class PaymentHistoryModule {
};
exports.PaymentHistoryModule = PaymentHistoryModule;
exports.PaymentHistoryModule = PaymentHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payment_history_entity_1.PaymentHistory, user_entity_1.User]),
        ],
        providers: [payment_history_service_1.PaymentHistoryService],
        controllers: [payment_history_controller_1.PaymentHistoryController],
        exports: [payment_history_service_1.PaymentHistoryService],
    })
], PaymentHistoryModule);
//# sourceMappingURL=payment-history.module.js.map