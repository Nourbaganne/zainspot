import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

function notFound() {
	return { message: 'Contact not found', statusCode: 404 };
}

@Injectable()
export class ContactService {
	constructor(
		@InjectRepository(Contact) private contactRepository: Repository<Contact>,
	) {}

	async create(createContactDto: CreateContactDto) {
		const newContact = this.contactRepository.create(createContactDto);
		return await this.contactRepository.save(newContact);
	}

	async findAll() {
		return await this.contactRepository.find();
	}

	async findOne(id: number) {
		const c = await this.contactRepository.findOne({ where: { id } });
		return c;
	}

	async remove(id: number) {
		const c = await this.findOne(id);
		if (!c) {
			return notFound();
		}
		return this.contactRepository.remove(c);
	}
}
