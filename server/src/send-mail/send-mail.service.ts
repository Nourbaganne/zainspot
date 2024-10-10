import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class SendMailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SENDMAIL_HOST'),
      port: Number(this.configService.get<number>('SENDMAIL_PORT')),
      secure: Number(this.configService.get<number>('SENDMAIL_PORT')) === 465,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(options: {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: Array<{
      filename: string;
      path?: string; // Use 'path' to specify file path
      content?: string; // Use 'content' for base64-encoded strings
      encoding?: string;
    }>;
  }): Promise<void> {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: options.from || this.configService.get<string>('SENDMAIL_FROM'),
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments?.map(attachment => ({
          filename: attachment.filename,
          path: attachment.path, // Optionally use 'path' to attach a file directly
          content: attachment.content, // Or use 'content' for base64-encoded content
          encoding: attachment.encoding || 'base64', // Default to base64 encoding
        })),
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending mail:', error);
      throw new InternalServerErrorException('Failed to send mail');
    }
  }
}
