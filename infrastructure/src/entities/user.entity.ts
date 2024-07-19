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
  VISITOR = 'visitor',
  ZAINSPOTTER = 'zainspotter',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

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
    default: UserRole.VISITOR,
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

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

  @Column({ default: 'Unknown' })
  country: string;

  @Column({ default: 'Unknown' })
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
