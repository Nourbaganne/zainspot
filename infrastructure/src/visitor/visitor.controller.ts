import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorService } from './visitor.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post()
  async create(@Body() createVisitorDto: CreateVisitorDto) {
    try {
      const visitor = await this.visitorService.create(createVisitorDto);
      return visitor;
    } catch (error) {
      throw new HttpException(
        'Failed to create visitor. Please Enter a unique email.',
        HttpStatus.EXPECTATION_FAILED,
        error,
      );
    }
  }

  @Get()
  async show(@Query('id') id: number) {
    return this.visitorService.findById(id);
  }

  @Get()
  findAll() {
    return this.visitorService.findAll();
  }
}
