import { Controller, Post, Body, Get, Param, Put, Headers, UnauthorizedException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-support-ticket.dto/create-support-ticket.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  private validateSupportToken(authorization: string) {
    console.log('Validating support token:', authorization);

    if (!authorization) {
      console.error('No authorization header provided');
      throw new UnauthorizedException('No authorization header');
    }

    try {
      // Extract token from Bearer format
      let token = authorization;
      if (authorization.startsWith('Bearer ')) {
        token = authorization.substring(7);
      }

      console.log('Extracted token:', token);

      // Decode the JWT token
      const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      
      // Check if it's a support user
      if (decodedToken.role?.name !== 'support') {
        console.error('Not a support user:', decodedToken);
        throw new UnauthorizedException('Not authorized as support');
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Public()
  @Post('messages')
  async sendMessage(@Body() dto: CreateMessageDto) {
    console.log('Controller: Sending message:', dto);
    try {
      const message = await this.chatService.createMessage(dto);
      console.log('Controller: Message created:', message);
      return message;
    } catch (error) {
      console.error('Controller: Error sending message:', error);
      throw error;
    }
  }

  @Public()
  @Get('messages/:conversationId')
  async getMessages(
    @Headers('authorization') authorization: string,
    @Param('conversationId') conversationId: string
  ) {
    console.log('Controller: Getting messages for conversation:', conversationId);
    console.log('Controller: Authorization header:', authorization);

    try {
      // Validate token if it's a support user request
      if (authorization) {
        this.validateSupportToken(authorization);
      }
      
      const messages = await this.chatService.getMessagesByConversationId(conversationId);
      console.log(`Controller: Retrieved ${messages.length} messages`);
      return messages;
    } catch (error) {
      console.error('Controller: Error in getMessages:', error);
      throw error;
    }
  }

  @Public()
  @Get('pending-conversations')
  async getPendingConversations(
    @Headers('authorization') authorization: string
  ) {
    console.log('Getting pending conversations. Auth:', authorization);
    try {
      // Validate token
      this.validateSupportToken(authorization);
      const conversations = await this.chatService.getPendingConversations();
      console.log(`Retrieved ${conversations.length} pending conversations`);
      return conversations;
    } catch (error) {
      console.error('Error in getPendingConversations:', error);
      throw error;
    }
  }

  @Public()
  @Put('conversations/:conversationId/read')
  async markAsRead(
    @Headers('authorization') authorization: string,
    @Param('conversationId') conversationId: string
  ) {
    this.validateSupportToken(authorization);
    return this.chatService.markMessagesAsRead(conversationId);
  }
}
