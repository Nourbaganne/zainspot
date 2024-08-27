import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from 'typeorm';

// TODO: I think we should add mechanism to prevent the same user from the submitting the same contact form multiple times
// ! Users could spam the contact form
@Entity()
export class Contact {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column()
	subject: string;

	@Column()
	message: string;

	@CreateDateColumn()
	createdAt: Date;
}
