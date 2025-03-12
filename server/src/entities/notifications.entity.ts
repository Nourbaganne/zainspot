import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('notifications')
export class Notifications extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(() => User, (user) => user.notifications, {
		onDelete: 'CASCADE',
	})
    @JoinColumn()
    user: User;                                                                                                                       

	@Column({ default: false })
	newCityNotif: boolean;

	@Column({ default: false })
	specialOfferNotif: boolean;

	@Column({ default: false })
	marketingNotif: boolean;

	@Column({ default: false })
	birthdayNotif: boolean;

	@Column({ default: false })
	greetingsNotif: boolean;

    @Column({default: false})
    monthlyPaymentAlert: boolean

    @Column({default: false})
    paymentReceipt: boolean

    @Column({default: false})
    paymentFailure: boolean

    @Column({default: false})
    imminentPayment: boolean

    @Column({default: false})
    paymentExpired: boolean

    @Column({default: false})
    passwordReset: boolean

    @Column({default: false})
    accModifications: boolean

    @Column({default: false})
    securityIssues: boolean

    @Column({default: false})
    manualHocNotif: boolean

}