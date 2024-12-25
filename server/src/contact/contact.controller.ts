import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Public()
	@Post()
	create(@Body() createContactDto: CreateContactDto) {
		return this.contactService.create(createContactDto);
	}

	@Public()
	@Get()
	findAll() {
		return this.contactService.findAll();
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.contactService.findOne(+id);
	}

	@Public()
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.contactService.remove(+id);
	}
}
