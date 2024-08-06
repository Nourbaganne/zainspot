import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Invoices {
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
