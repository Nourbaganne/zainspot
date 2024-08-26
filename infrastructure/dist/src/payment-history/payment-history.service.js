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
exports.PaymentHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_history_entity_1 = require("../entities/payment-history.entity");
const user_entity_1 = require("../entities/user.entity");
let PaymentHistoryService = class PaymentHistoryService {
    constructor(paymentHistoryRepository, userRepository) {
        this.paymentHistoryRepository = paymentHistoryRepository;
        this.userRepository = userRepository;
    }
    async create(createPaymentHistoryDto) {
        const { userId, ...paymentHistoryData } = createPaymentHistoryDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        const paymentHistory = this.paymentHistoryRepository.create({
            ...paymentHistoryData,
            user,
        });
        return this.paymentHistoryRepository.save(paymentHistory);
    }
    async findAll(userId) {
        return this.paymentHistoryRepository.find({
            where: { user: { id: userId } },
        });
    }
    findOne(id) {
        return this.paymentHistoryRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const payment = await this.paymentHistoryRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`payment history with ID ${id} not found`);
        }
        await this.paymentHistoryRepository.delete(id);
        return `payment with ID ${id} deleted successfully`;
    }
};
exports.PaymentHistoryService = PaymentHistoryService;
exports.PaymentHistoryService = PaymentHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_history_entity_1.PaymentHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentHistoryService);
//# sourceMappingURL=payment-history.service.js.map