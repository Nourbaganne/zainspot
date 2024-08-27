import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
		const contacts = await this.contactRepository.find();
		return contacts;
	}

	findOne(id: number) {
		return `This action returns a #${id} contact`;
	}

	update(id: number, updateContactDto: UpdateContactDto) {
		return `This action updates a #${id} contact`;
	}

	remove(id: number) {
		return `This action removes a #${id} contact`;
	}
}
