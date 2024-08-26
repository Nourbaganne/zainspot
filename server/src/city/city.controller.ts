import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityService } from './city.service';
import { Public } from 'src/decorators/public.decorator';
import { Pagination, PaginationParams } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { City } from 'src/entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Public()
  @Get()
  getCities(
    @PaginationParams() paginationParams: Pagination,
    @Query('name') name?: string,
  ): Promise<PaginatedResource<Partial<City>>> {
    return this.cityService.getCities(paginationParams, name);
  }

  @Public()
  @Get(':id')
  getOneCity(@Param('id') id: string) {
    try {
      return this.cityService.getCity(+id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  createCity(
    @Body() createCityDto: CreateCityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cityService.createCity(createCityDto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateCity(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cityService.updateCity(+id, updateCityDto, file);
  }

  @Patch(':id/hide')
  async hideCity(
    @Param('id') id: number,
  ) {
    return this.cityService.hideCity(id);
  }


  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.cityService.removeCity(+id);
  }
}
