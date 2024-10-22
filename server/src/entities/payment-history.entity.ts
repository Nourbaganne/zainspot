import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	BaseEntity,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Subscription } from './subscription.entity';

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
	status: string = 'PENDING';

	@Column({ nullable: true })
	stripeSessionId: string;

	@ManyToOne(() => User, (user) => user.paymentHistories, {
		onDelete: 'CASCADE',
	})
	user: User;

	@OneToOne(() => Subscription)
	@JoinColumn()
	subscription: Subscription;
}
