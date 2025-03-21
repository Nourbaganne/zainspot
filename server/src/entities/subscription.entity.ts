import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
	BaseEntity,
	OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { City } from './city.entity';
import { PaymentHistory } from './payment-history.entity';

@Entity()
export class Subscription extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.paymentHistories, {
		onDelete: 'CASCADE',
	})
	user: User;

	// when subscription is removed, remove payment history as well
	@OneToOne(
		() => PaymentHistory,
		(paymentHistory) => paymentHistory.subscription,
		{ cascade: true },
	)
	paymentHistory: PaymentHistory;

	@ManyToOne(() => City, (city) => city.subscriptions)
	city: City;

	@CreateDateColumn()
	startDate: Date;

	@Column()
	endDate: Date;

	@Column()
	optionType: string;

	@Column()
	duration: number;

	@Column()
	price: number;

	@Column({ nullable: true })
	renewalDate: Date;

	@Column({ nullable: true })
	renewalStatus: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ nullable: true, default: ''})
	telnyxNumber: string;

	@Column({nullable: true})
	numberStatus: string;
}

// ? You can get the stripePriceId using cityId, optionType, and duration
