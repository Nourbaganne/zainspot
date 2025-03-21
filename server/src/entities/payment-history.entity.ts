import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
	OneToOne,
	JoinColumn,
	AfterUpdate,
	OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Subscription } from './subscription.entity';
import { Invoice } from './invoice.entity';
import { PaymentHistoryService } from 'src/payment-history/payment-history.service';
import { City } from './city.entity';

@Entity()
export class PaymentHistory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column({ nullable: true })
	method: string;

	@Column('decimal')
	amount: number;

	@Column()
	status: string = 'FAILED';

	@Column({ nullable: true })
	stripeSessionId: string;

	@ManyToOne(() => User, (user) => user.paymentHistories, {
		onDelete: 'CASCADE',
	})
	user: User;

	@OneToOne(() => Subscription, (subscription) => subscription.paymentHistory, {
		onDelete: 'SET NULL',
	})
	@JoinColumn()
	subscription: Subscription;

	@OneToMany(() => City, (city) => city.paymentHistory)
	city: City;

	@AfterUpdate()
	async createInvoice() {
		console.log('createInvoice called');
		if (this.status.toLowerCase() == 'paid') {
			try {
				const paymentHistoryService = new PaymentHistoryService();
				const updatedPaymentHistory =
					await paymentHistoryService.findOneWithUser(this.id);

				const inv = Invoice.create({
					dateIssued: this.date,
					dueDate: new Date(),
					amount: this.amount,
					status: this.status,
					user: updatedPaymentHistory.user,
					paymentHistory: this,
				});

				inv.save();
			} catch (err) {
				console.error(err);
			}
		}
	}
}
