import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  ZAINSPOTTER = 'zainspotter',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: false})
  isEmailConfirmed: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ZAINSPOTTER,
  })
  role: UserRole;

  async validatePassword(password: string): Promise<boolean> {
    console.log('Password:', password);
    console.log('Hashed Password:', this.password);
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
}
