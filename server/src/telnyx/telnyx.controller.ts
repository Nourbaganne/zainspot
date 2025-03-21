
import { Body, Controller, Post } from '@nestjs/common';
import { TelnyxService } from './telnyx.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('telnyx')
export class TelnyxController {
  constructor(private readonly telnyxService: TelnyxService) { }

  @Public()
  @Post('purchase-number')
  async purchaseNumber(@Body() body: { countryCode: string; areaCode?: string }) {
    return this.telnyxService.purchaseNumber(body.countryCode, body.areaCode);
  }

}
