import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    ValidateNested,
    ArrayNotEmpty,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class AttachmentDto {
    @IsString()
    filename: string;
  
    @IsString()
    content: string; 
  
    @IsOptional()
    @IsString()
    encoding?: string;
  }
  
  export class SendMailDto {
    @IsOptional()
    @IsEmail()
    from?: string;
  
    @IsNotEmpty()
    @IsEmail({}, { each: true })
    to: string | string[];
  
    @IsOptional()
    @IsEmail({}, { each: true })
    cc?: string | string[];
  
    @IsOptional()
    @IsEmail({}, { each: true })
    bcc?: string | string[];
  
    @IsNotEmpty()
    @IsString()
    subject: string;
  
    @IsOptional()
    @IsString()
    text?: string;
  
    @IsOptional()
    @IsString()
    html?: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    attachments?: AttachmentDto[];
  }
  