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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("../entities/subscription.entity");
const user_entity_1 = require("../entities/user.entity");
const city_entity_1 = require("../entities/city.entity");
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionRepository, userRepository, cityRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.cityRepository = cityRepository;
    }
    async createSubscription(createSubscriptionDto) {
        const { ...subscriptionData } = createSubscriptionDto;
        const user = await this.userRepository.findOneBy({ id: subscriptionData.userId });
        const city = await this.cityRepository.findOneBy({ id: subscriptionData.cityId });
        if (!user || !city) {
            throw new Error('User or City not found');
        }
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + subscriptionData.duration);
        const subscription = this.subscriptionRepository.create({
            ...subscriptionData,
            user,
            city,
            startDate,
            endDate,
        });
        return this.subscriptionRepository.save(subscription);
    }
    async getSubscriptionsByUser(userId) {
        const subscriptions = await this.subscriptionRepository.find({
            where: { user: { id: userId } },
            relations: ['city', 'user'],
        });
        return subscriptions.map(subscription => ({
            id: subscription.id,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            optionType: subscription.optionType,
            duration: subscription.duration,
            price: subscription.price,
            city: {
                id: subscription.city.id,
                city: subscription.city.city,
                country: subscription.city.country,
                imageUrl: subscription.city.imageUrl,
                locationTitle: subscription.city.location.title,
            },
            user: {
                id: subscription.user.id,
                email: subscription.user.email,
                businessNumber: subscription.user.businessNumber,
            },
            renewal: {
                date: subscription?.renewalDate,
                status: subscription?.renewalStatus
            }
        }));
    }
    async remove(id) {
        const subscription = await this.subscriptionRepository.findOne({ where: { id } });
        if (!subscription) {
            throw new common_1.NotFoundException(`Subscription history with ID ${id} not found`);
        }
        await this.subscriptionRepository.delete(id);
        return `Subscription with ID ${id} deleted successfully`;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map