import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';
import { PaymentHistory } from './payment-history.entity';
import { Subscription } from './subscription.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column({ default: false })
	isEmailConfirmed: boolean;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	@Column({ nullable: true })
	businessNumber: string;

	@Column()
	businessName: string;

	@Column()
	tradeName: string;

	@Column()
	businessType: string;

	@Column({})
	country: string;

	@Column({})
	city: string;

	@Column({ default: 'Unknown' })
	businessWebsite: string;

	@Column()
	state: string;

	@Column()
	zipCode: string;

	@Column()
	fullStreetAdress: string;

	@Column()
	interestRegion: string;

	@Column()
	name: string;

	@Column({ default: '' })
	middleName: string;

	@Column()
	lastName: string;

	@Column()
	gender: string;

	@Column({ type: 'date', nullable: true })
	birthday: Date;

	@Column({ nullable: true, default: '' })
	mediaProfile: string;

	@Column({ default: '' })
	recaptcha: string;

	@ManyToOne(() => Role, { cascade: true })
	@JoinColumn({ name: 'roleId' })
	role: Role;

	
	@OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.user, {
		cascade: ['remove'],  // Cascade delete when user is deleted
	})
	paymentHistories: PaymentHistory[];

	@OneToMany(() => Subscription, (subscription) => subscription.user, {
		cascade: ['remove'],  // Cascade delete when user is deleted
	})
	subscriptions: Subscription[];

	@Column({default: true})
	activation: boolean;
}
