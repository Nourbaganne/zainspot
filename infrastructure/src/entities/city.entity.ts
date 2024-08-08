import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  NumericType,
  OneToMany,
} from 'typeorm';
import { Subscription } from './subscription.entity';

interface PerMonth {
  duration: number;
  amount: number;
}

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('bool')
  disponibility: boolean;

  @Column('json', { nullable: true })
  location: { title: string; posx: NumericType; posy: NumericType };

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  goldPrice: number;

  @Column('json', { nullable: true })
  classicPrice: { perYear: number; perMonth: PerMonth[] };

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.city)
  subscriptions: Subscription[];
}
