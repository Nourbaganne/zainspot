import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';
import { PaymentHistory } from './payment-history.entity';
import { Subscription } from './subscription.entity';
import { Notifications } from './notifications.entity';

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

	@Column({ default: null })
	stripeCustomerId: string;

	@ManyToOne(() => Role, { cascade: true })
	@JoinColumn({ name: 'roleId' })
	role: Role;

	@OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.user, {
		cascade: ['remove'], 
	})
	paymentHistories: PaymentHistory[];

	@OneToMany(() => Subscription, (subscription) => subscription.user, {
		cascade: ['remove'], // Cascade delete when user is deleted
	})
	subscriptions: Subscription[];

	@OneToOne(() => Notifications, (notifications) => notifications.user, {
		cascade: ['remove'], // Cascade delete when user is deleted
	})
    notifications: Notifications;

	@Column({ default: true })
	activation: boolean;

	@Column({ default: false })
	EmailAuthentication: boolean;

	@Column({ nullable: true })
	twoFactorCode: string;

	@Column({ type: 'timestamp', nullable: true })
	twoFactorCodeExpiresAt: Date;

	@Column({ default: null })
	suiteNumber: string;

	@Column({ default: 'AR' })
	preferedLanguage: string;

	@Column({ default: 'USD' })
	preferedCurrency: string;

}
