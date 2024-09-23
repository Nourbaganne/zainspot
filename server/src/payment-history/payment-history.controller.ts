import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete } from '@nestjs/common';
import { PaymentHistoryService } from './payment-history.service';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';

@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  @Post()
  create(@Body() createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return this.paymentHistoryService.create(createPaymentHistoryDto);
  }

  @Get(':userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.paymentHistoryService.findOneByUserId(userId);
  }

  @Get('detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentHistoryService.findOne(id);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentHistoryService.remove(id);
  }
}
