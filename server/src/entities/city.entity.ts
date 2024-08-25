import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  NumericType,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Subscription } from './subscription.entity';

interface PerMonth {
  duration: number;
  amount: number;
  tax: number
}

@Entity('cities')
export class City extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;
  
  @Column()
  country: string;

  @Column('bool')
  hidden: boolean;

  @Column('json', { nullable: true })
  location: { title: string; posx: NumericType; posy: NumericType };

  @Column('text', { nullable: true })
  description: string;

  @Column('json', { nullable: true })
  goldPrice: { value: number; tax: number };

  @Column('json', { nullable: true })
  classicPrice: { perMonth: PerMonth[] };

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.city)
  subscriptions: Subscription[];
}
