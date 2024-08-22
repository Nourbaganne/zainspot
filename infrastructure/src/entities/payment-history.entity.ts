import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PaymentHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  subscription: {
    country: string;
    type: string;
  };

  @Column()
  date: Date;

  @Column()
  method: string;

  @Column('decimal')
  amount: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.paymentHistories)
  user: User;
}
