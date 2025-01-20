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
import { PaymentHistory } from './payment-history.entity';

@Entity('invoice')
export class Invoice extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	dateIssued: Date;

	@Column()
	dueDate: Date;

	@Column('decimal')
	amount: number;

	@Column()
	status: string;

	@OneToOne(() => PaymentHistory, { onDelete: 'CASCADE' })
	@JoinColumn()
	paymentHistory: PaymentHistory;

	@ManyToOne(() => User, (user) => user.paymentHistories, {
		onDelete: 'CASCADE',
	})
	user: User;
}
