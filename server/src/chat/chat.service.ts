// server/src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { v4 as uuidv4 } from 'uuid';
import { Public } from 'src/decorators/public.decorator';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class ChatService {
  @WebSocketServer() server: Server;

  constructor(
    @InjectRepository(Message)
    private readonly chatRepository: Repository<Message>,
  ) {}

  @Public()
  async createMessage(data: { 
    sender: string; 
    content: string; 
    senderType: 'user' | 'agent';
    conversationId?: string;
  }): Promise<Message> {
    console.log('Service: Creating message:', data);

    try {
      // Create message entity
      const message = this.chatRepository.create({
        ...data,
        conversationId: data.conversationId || uuidv4(),
        isRead: false,
        createdAt: new Date()
      });

      // Save message
      const savedMessage = await this.chatRepository.save(message);
      console.log('Service: Saved message:', savedMessage);

      // If it's an agent message, emit it to the specific conversation room
      if (data.senderType === 'agent' && this.server) {
        console.log('Service: Emitting agent message to conversation:', data.conversationId);
        this.server.emit('newMessage', savedMessage);
      }

      return savedMessage;
    } catch (error) {
      console.error('Service: Error creating message:', error);
      throw new Error('Failed to create message');
    }
  }

  async saveMessage(messageData: Partial<Message>): Promise<Message> {
    console.log('Service: Saving message:', messageData);

    // Generate conversation ID if not provided
    if (!messageData.conversationId) {
      messageData.conversationId = uuidv4();
      console.log('Service: Generated new conversation ID:', messageData.conversationId);
    }

    // Create message entity
    const message = this.chatRepository.create({
      ...messageData,
      createdAt: new Date(),
      isRead: false
    });

    // Save and return
    const savedMessage = await this.chatRepository.save(message);
    console.log('Service: Message saved successfully:', savedMessage);
    return savedMessage;
  }

  @Public()
  async getMessages(conversationId?: string): Promise<Message[]> {
    try {
      console.log('Service: Getting messages for conversation:', conversationId);
      
      const messages = await this.chatRepository.find({
        where: { conversationId },
        order: { createdAt: 'ASC' }
      });

      console.log(`Service: Found ${messages.length} messages:`, messages);
      return messages;
    } catch (error) {
      console.error('Service: Error getting messages:', error);
      throw new Error('Failed to get messages');
    }
  }

  async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    try {
      console.log('Service: Getting messages by conversation ID:', conversationId);
      
      const messages = await this.chatRepository.find({
        where: { conversationId },
        order: { createdAt: 'ASC' }
      });

      console.log(`Service: Found ${messages.length} messages for conversation`);
      return messages;
    } catch (error) {
      console.error('Service: Error getting messages:', error);
      throw new Error('Failed to get messages');
    }
  }

  @Public()
  async markMessagesAsRead(conversationId: string): Promise<void> {
    console.log('Service: Marking messages as read for conversation:', conversationId);
    
    await this.chatRepository.update(
      { conversationId, isRead: false },
      { isRead: true }
    );
    
    console.log('Service: Messages marked as read');
  }

  async markMessageAsRead(messageId: number): Promise<Message> {
    try {
      const message = await this.chatRepository.findOne({ where: { id: messageId } });
      if (!message) {
        throw new Error('Message not found');
      }
      message.isRead = true;
      return await this.chatRepository.save(message);
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }

  @Public()
  async getPendingConversations(): Promise<any[]> {
    try {
      // Get all conversations with their latest message time and message count
      const conversations = await this.chatRepository
        .createQueryBuilder('message')
        .select('message.conversationId', 'conversationId')  // Alias to ensure proper column name
        .addSelect('MAX(message.createdAt)', 'lastMessageTime')
        .addSelect('COUNT(*)', 'messageCount')
        .addSelect('MAX(message.sender)', 'lastSender')  // Get the last sender
        .addSelect('MAX(message.senderType)', 'lastSenderType')  // Get the last sender type
        .groupBy('message.conversationId')
        .orderBy('lastMessageTime', 'DESC')
        .getRawMany();

      console.log('Service: Found conversations:', conversations);
      return conversations;
    } catch (error) {
      console.error('Error getting pending conversations:', error);
      throw new Error('Failed to get pending conversations');
    }
  }
}