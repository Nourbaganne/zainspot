import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
	OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class PaymentHistory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Subscription, (subscription) => subscription.paymentHistory)
	subscription: Subscription;

	@Column()
	date: Date;

	@Column({ nullable: true })
	method: string;

	@Column('decimal')
	amount: number;

	@Column()
	status: string = 'PENDING';

	@Column({ nullable: true })
	stripeSessionId: string;

	@ManyToOne(() => User, (user) => user.paymentHistories)
	user: User;
}
