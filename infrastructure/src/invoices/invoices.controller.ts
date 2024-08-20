import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoicesDto } from './dto/create-invoices';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createPaymentHistoryDto: CreateInvoicesDto) {
    return this.invoicesService.create(createPaymentHistoryDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.invoicesService.findAll(userId);
  }

  @Get('detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoicesService.findOne(id);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoicesService.remove(id);
  }
}
