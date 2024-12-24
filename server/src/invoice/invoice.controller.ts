import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoicesDto } from './dto/create-invoices';
import { Public } from 'src/decorators/public.decorator';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoiceService) {}

	@Public()
  @Post()
  create(@Body() createPaymentHistoryDto: CreateInvoicesDto) {
    return this.invoiceService.create(createPaymentHistoryDto);
  }

	@Public()
  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.invoiceService.findAll(userId);
  }

	@Public()
  @Get('detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.findOne(id);
  }

	@Public()
  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.remove(id);
  }
}
