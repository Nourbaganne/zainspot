import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';

@Module({
  providers: [VisitorService],
  exports: [VisitorService],
  controllers: [VisitorController],
})
export class VisitorModule {}
