import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly cityService: CitiesService) {}

  @Get()
  getCities() {
    return this.cityService.getCities();
  }

  @Get(':id')
  getOneCity(@Param('id') id: string) {
    try {
      return this.cityService.getCity(+id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCity(@Body() createCityDto: CreateCityDto, @UploadedFile() file: Express.Multer.File) {
    return this.cityService.createCity(createCityDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateCity(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto, @UploadedFile() file: Express.Multer.File) {
    return this.cityService.updateCity(+id, updateCityDto, file);
  }

  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.cityService.removeCity(+id);
  }
}
