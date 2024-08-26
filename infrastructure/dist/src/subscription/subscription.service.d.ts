import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { User } from '../entities/user.entity';
import { City } from '../entities/city.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
export declare class SubscriptionService {
    private readonly subscriptionRepository;
    private readonly userRepository;
    private readonly cityRepository;
    constructor(subscriptionRepository: Repository<Subscription>, userRepository: Repository<User>, cityRepository: Repository<City>);
    createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    getSubscriptionsByUser(userId: number): Promise<SubscriptionResponseDto[]>;
    remove(id: number): Promise<string>;
}
