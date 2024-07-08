import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  disponibility: boolean;

  @Column({
    type: 'double',
    precision: 10,
    scale: 6,
  })
  location: { title: string; posx: number; posy: number };

  @Column()
  description: string;

  @Column()
  goldPrice: number;

  @Column('json')
  classicPrice: { duration: string; amount: number }[];

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
