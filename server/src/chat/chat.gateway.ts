import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { Public } from 'src/decorators/public.decorator';

interface ClientToServerEvents {
  sendMessage: (data: { sender: string; content: string; conversationId?: string; senderType: 'user' | 'agent' }, callback: (error: any, response: any) => void) => void;
  joinRoom: (conversationId: string) => void;
  leaveRoom: (conversationId: string) => void;
  agentJoin: () => void;
  loadMessages: (data: { conversationId: string }) => void;
  getMessages: (data: { conversationId: string }) => void;
  markMessageAsRead: (data: { messageId: number }) => void;
}

interface ServerToClientEvents {
  newMessage: (message: any) => void;
  newConversation: (conversation: any) => void;
  error: (error: string) => void;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private agents: Set<string> = new Set();
  private clientRooms: Map<string, Set<string>> = new Map();

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Log current state
    console.log('Current agents:', Array.from(this.agents));
    console.log('Current client rooms:', Object.fromEntries(this.clientRooms));
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    console.log('Was client an agent?', this.agents.has(client.id));
    
    // Remove from agents list if they were an agent
    this.agents.delete(client.id);
    
    // Leave all rooms
    const rooms = this.clientRooms.get(client.id);
    if (rooms) {
      console.log(`Removing client ${client.id} from rooms:`, Array.from(rooms));
      rooms.forEach(room => client.leave(room));
      this.clientRooms.delete(client.id);
    }

    // Log final state
    console.log('Updated agents list:', Array.from(this.agents));
    console.log('Updated client rooms:', Object.fromEntries(this.clientRooms));
  }

  @SubscribeMessage('agentJoin')
  async handleAgentJoin(@ConnectedSocket() client: Socket) {
    console.log('Agent joining:', client.id);
    this.agents.add(client.id);
    client.join('agents');
    console.log('Gateway: Current agents:', Array.from(this.agents));
    return { success: true };
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client ${client.id} joining room ${conversationId}`);
    client.join(conversationId);
    
    // Track which rooms this client is in
    let rooms = this.clientRooms.get(client.id);
    if (!rooms) {
      rooms = new Set();
      this.clientRooms.set(client.id, rooms);
    }
    rooms.add(conversationId);
    
    console.log('Current rooms for client:', Array.from(this.clientRooms.get(client.id) || []));
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client ${client.id} leaving room ${conversationId}`);
    client.leave(conversationId);
    
    // Remove room from client's tracked rooms
    const rooms = this.clientRooms.get(client.id);
    if (rooms) {
      rooms.delete(conversationId);
    }
    
    console.log('Current rooms for client:', Array.from(this.clientRooms.get(client.id) || []));
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log('Gateway: Received message:', data);

      // Validate required fields
      if (!data.content || !data.sender || !data.senderType) {
        throw new Error('Missing required message fields');
      }

      // Save message to database
      const savedMessage = await this.chatService.saveMessage({
        content: data.content,
        sender: data.sender,
        senderType: data.senderType,
        conversationId: data.conversationId,
        isRead: false
      });

      console.log('Gateway: Message saved:', savedMessage);

      // Join the conversation room if not already joined
      if (data.conversationId) {
        const rooms = Array.from(client.rooms);
        if (!rooms.includes(data.conversationId)) {
          client.join(data.conversationId);
          console.log('Gateway: Client joined room:', data.conversationId);
        }
      }

      // Emit to conversation room
      if (data.conversationId) {
        console.log('Gateway: Broadcasting to conversation:', data.conversationId);
        this.server.to(data.conversationId).emit('newMessage', savedMessage);
      }

      // If message is from user, notify agents
      if (data.senderType === 'user') {
        console.log('Gateway: Broadcasting to agents');
        this.server.to('agents').emit('newMessage', savedMessage);
      }

      return { success: true, message: savedMessage };
    } catch (error) {
      console.error('Gateway: Error handling message:', error);
      return { success: false, error: 'Failed to process message' };
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(@MessageBody() data: { conversationId: string }) {
    try {
      console.log('Gateway: Getting messages for conversation:', data.conversationId);
      const messages = await this.chatService.getMessages(data.conversationId);
      return { success: true, messages };
    } catch (error) {
      console.error('Gateway: Error getting messages:', error);
      return { success: false, error: 'Failed to get messages' };
    }
  }

  @SubscribeMessage('markMessageAsRead')
  async handleMarkMessageAsRead(@MessageBody() data: { messageId: number }) {
    try {
      const message = await this.chatService.markMessageAsRead(data.messageId);
      return { success: true, message };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { success: false, error: 'Failed to mark message as read' };
    }
  }

  @SubscribeMessage('loadMessages')
  async handleLoadMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string },
  ) {
    try {
      const messages = await this.chatService.getMessages(data.conversationId);
      return messages;
    } catch (error) {
      console.error('Error loading messages:', error);
      client.emit('error', 'Failed to load messages');
      return [];
    }
  }
}