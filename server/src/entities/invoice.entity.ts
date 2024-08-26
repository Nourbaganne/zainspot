import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Invoice extends BaseEntity{
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

  @ManyToOne(() => User, user => user.paymentHistories)
  user: User;
}
