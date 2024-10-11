
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecaptchaService {
  constructor(private readonly configService: ConfigService) {}

  async validateRecaptcha(token: string): Promise<boolean> {
    const secretKey = this.configService.get<string>('RECAPTCHA_SECRET_KEY');

    if (!secretKey) {
      throw new HttpException('reCAPTCHA secret key is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: token,
          },
        },
      );

      return response.data.success;
    } catch (error) {
      console.error('reCAPTCHA validation failed:', error);
      throw new HttpException('reCAPTCHA validation failed', HttpStatus.BAD_REQUEST);
    }
  }
}
