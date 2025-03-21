import { Injectable } from '@nestjs/common';
import * as Telnyx from 'telnyx';

@Injectable()
export class TelnyxService {
  private telnyx;
  private isTestMode: boolean;

  constructor() {
    this.telnyx = Telnyx(process.env.TELNYX_API_KEY);
    this.isTestMode = process.env.TELNYX_TEST_MODE === 'true'; 
  }

  async searchAvailableNumbers(countryCode: string, areaCode?: string) {
    if (this.isTestMode) {
      return [{ phone_number: '+14155550123' }];
    }

    try {
      const response = await this.telnyx.availablePhoneNumbers.list({
        country_code: countryCode,
        area_code: areaCode,
      });

      return response.data;
    } catch (error) {
      throw new Error('Error searching numbers: ' + error.message);
    }
  }

  async purchaseNumber(countryCode: string, areaCode?: string) {
    try {
      const availableNumbers = await this.searchAvailableNumbers(countryCode, areaCode);

      if (availableNumbers.length === 0) {
        throw new Error('No available numbers found');
      }

      const phoneNumber = availableNumbers[0].phone_number;

      if (this.isTestMode) {
        console.log(`Test purchase for ${phoneNumber}`)
        return { success: true, message: `Test purchase for ${phoneNumber}` };
      }

      const purchaseResponse = await this.telnyx.numberOrders.create({
        phone_numbers: [{ phone_number: phoneNumber }],
      });


      return purchaseResponse.data;
    } catch (error) {
      throw new Error('Error purchasing number: ' + error.message);
    }
  }
}
