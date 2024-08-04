import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PaymentHistoryService } from './payment-history.service';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { PaymentHistory } from '../entities/payment-history.entity';

@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  @Post()
  create(@Body() createPaymentHistoryDto: CreatePaymentHistoryDto): Promise<PaymentHistory> {
    return this.paymentHistoryService.create(createPaymentHistoryDto);
  }

  @Get()
  findAll(): Promise<PaymentHistory[]> {
    return this.paymentHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PaymentHistory> {
    return this.paymentHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.paymentHistoryService.remove(+id);
  }
}
