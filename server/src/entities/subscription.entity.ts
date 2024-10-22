import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
	BaseEntity,
	OneToOne,
	JoinColumn,
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
}

// ? You can get the stripePriceId using cityId, optionType, and duration
