import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  sender: string;

  @IsString()
  content: string;

  @IsEnum(['user', 'agent'])
  senderType: 'user' | 'agent';

  @IsString()
  @IsOptional()
  conversationId?: string;
}
