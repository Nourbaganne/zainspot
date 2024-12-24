import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete } from '@nestjs/common';
import { PaymentHistoryService } from './payment-history.service';
import { CreatePaymentHistoryDto } from './dto/create-payment-history';
import { Public } from 'src/decorators/public.decorator';

@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

	@Public()
  @Post()
  create(@Body() createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return this.paymentHistoryService.create(createPaymentHistoryDto);
  }

	@Public()
  @Get(':userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.paymentHistoryService.findOneByUserId(userId);
  }

	@Public()
  @Get('detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentHistoryService.findOne(id);
  }

	@Public()
  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentHistoryService.remove(id);
  }
}
