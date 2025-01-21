import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(Subscription)
		private subscrptionRepo: Repository<Subscription>,
	) {}

	// cron job that delete subscriptions associated with failed (status = 'FAILED') payment history
	// delete subscriptions older than 30 minutes only
	// cron job runs every 24 hours at midnight
	@Cron('0 0 * * *')
	async deleteFailedSubscriptions() {
		console.log('CRON Job to delete failed subscriptions executed');
		try {
			const subs = await this.subscrptionRepo.find({
				where: { paymentHistory: { status: 'FAILED' } },
				relations: ['paymentHistory'],
			});
			const failedSubsIds = subs
				.filter((sub) => {
					const now = new Date().getTime();
					const createdAt = new Date(sub.createdAt);
					return now - createdAt.getTime() > 30 * 60 * 1000;
				})
				.map((sub) => sub.id);

			if (failedSubsIds.length === 0) return;

			// ? send email to subscription owners with failed payment letting them know their subscription has been deleted due to failed payment

			await this.subscrptionRepo.delete(failedSubsIds);
		} catch (err) {
			console.log('Failed to delete subscriptions: ', err);
			// ? send email to dev or managment team letting them that the cron job to delete failed subscriptions failed
		}
	}
}
