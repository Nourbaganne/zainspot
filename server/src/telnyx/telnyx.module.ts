import { Module } from '@nestjs/common';
import { TelnyxController } from './telnyx.controller';
import { TelnyxService } from './telnyx.service';

@Module({
  controllers: [TelnyxController],
  providers: [TelnyxService]
})
export class TelnyxModule {}
