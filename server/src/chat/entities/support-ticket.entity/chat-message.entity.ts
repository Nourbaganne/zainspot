// server/src/chat/entities/chat-message.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversationId: string;

  @Column()
  sender: string;

  @Column()
  senderType: 'user' | 'agent';

  @Column()
  content: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: 'pending' })
  status: 'pending' | 'answered' | 'closed';

  @CreateDateColumn()
  createdAt: Date;
}