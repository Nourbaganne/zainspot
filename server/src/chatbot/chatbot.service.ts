import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
	respondToMessage(message: string): string {
		return 'Hello, how can I help you?';
	}
}
