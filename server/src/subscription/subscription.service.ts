import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { User } from '../entities/user.entity';
import { City } from '../entities/city.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { PaymentHistory } from 'src/entities/payment-history.entity';
import { updateSubscriptionDto } from './dto/update-subscription.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SubscriptionService {
	constructor(
		@InjectRepository(Subscription)
		private readonly subscriptionRepository: Repository<Subscription>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(City)
		private readonly cityRepository: Repository<City>,
		@InjectRepository(PaymentHistory)
		private readonly paymentHistoryRepository: Repository<PaymentHistory>,
		private readonly userService: UserService,
	) { }

	async createSubscription(
		createSubscriptionDto: CreateSubscriptionDto,
	): Promise<Subscription> {
		const { ...subscriptionData } = createSubscriptionDto;

		const user = await this.userRepository.findOneBy({
			id: subscriptionData.userId,
		});
		const city = await this.cityRepository.findOneBy({
			id: subscriptionData.cityId,
		});

		if (!user || !city) {
			throw new Error('User or City or Payment History not found');
		}

		const startDate = new Date();
		const endDate = new Date();
		endDate.setMonth(startDate.getMonth() + subscriptionData.duration);

		const subscription = this.subscriptionRepository.create({
			...subscriptionData,
			user,
			city,
		});

		// update the user's suite number
		this.userService.suiteNumberVerification(user);

		return this.subscriptionRepository.save(subscription);
	}

	
	async createMany(subscriptions: any): Promise<Subscription[]> {
		return new Promise(async (resolve, reject) => {
			try {
				const subs: Subscription[] = [];
				for (let i = 0; i < subscriptions.length; i++) {
					const sub = await Subscription.create(subscriptions[i]);
					sub.user = await User.findOneBy({ id: subscriptions[i].userId });
					sub.city = await City.findOneBy({ id: subscriptions[i].cityId });
					sub.payment = await PaymentHistory.findOneBy({
						id: subscriptions[i].paymentId,
					});
					sub.save();
					subs.push(sub);
				}
				resolve(subs);
			} catch (err) {
				reject(err);
			}
		});
	}

	async getSubscriptionsByUser(
		userId: number,
	): Promise<SubscriptionResponseDto[]> {
		const subscriptions = await this.subscriptionRepository.find({
			where: { user: { id: userId } },
			relations: ['city', 'user'],
		});

		return subscriptions.map((subscription) => ({
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
				status: subscription?.renewalStatus,
			},
		}));
	}

	async update(
		id: number,
		updateSubscriptionDto: updateSubscriptionDto,
	): Promise<Subscription> {
		const subscription = await this.subscriptionRepository.findOne({
			where: { id },
		});

		if (!subscription) {
			throw new NotFoundException(`Subscription with ID ${id} not found`);
		}

		const { ...subscriptionData } = updateSubscriptionDto;

		// Assign new data to subscription
		Object.assign(subscription, subscriptionData);

		return subscription.save();
	}

	async remove(id: number): Promise<string> {
		const subscription = await this.subscriptionRepository.findOne({
			where: { id },
		});

		if (!subscription) {
			throw new NotFoundException(
				`Subscription history with ID ${id} not found`,
			);
		}

		await this.subscriptionRepository.delete(id);

		return `Subscription with ID ${id} deleted successfully`;
	}
}
