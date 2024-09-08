import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelnyxService {
  private readonly apiKey = process.env.TELNYX_API_KEY; 
  private readonly baseUrl = 'https://api.telnyx.com/v2';

  async sendVerificationCode(phoneNumber: string, code: string): Promise<void> {
    const url = `${this.baseUrl}/messages`;
    const data = {
      from: '+21650743862',
      to: phoneNumber,
      text: `Your verification code is ${code}`,
    };

    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error sending SMS via Telnyx:', error);
      throw new Error('Unable to send verification code');
    }
  }
}
