import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { Subscription } from '../entities/subscription.entity';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    getSubscriptionsByUser(userId: number): Promise<SubscriptionResponseDto[]>;
    remove(id: number): Promise<string>;
}
