import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { City } from './city.entity';

@Entity()
export class Subscription {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.subscriptions)
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
