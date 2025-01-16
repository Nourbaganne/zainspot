import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('chatbot')
export class ChatbotController {
	constructor(private readonly chatbotService: ChatbotService) {}

	@Public()
	@Post()
	sayHello(@Body() { message }: { message: string }): string {
		return this.chatbotService.respondToMessage(message);
	}
}
