import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsEnum } from 'class-validator';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  @IsEnum(Action)
  action: Action;

  @Column()
  resource: string;
}
