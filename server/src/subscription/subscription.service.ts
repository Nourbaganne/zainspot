import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { User } from '../entities/user.entity';
import { City } from '../entities/city.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) { }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
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

  async getSubscriptionsByUser(userId: number): Promise<SubscriptionResponseDto[]> {
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
      renewal:{
        date: subscription?.renewalDate,
        status: subscription?.renewalStatus  
      }
    }));
  }

  async remove(id: number): Promise<string> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id } });

    if (!subscription) {
      throw new NotFoundException(`Subscription history with ID ${id} not found`);
    }

    await this.subscriptionRepository.delete(id);

    return `Subscription with ID ${id} deleted successfully`;
  }
}
