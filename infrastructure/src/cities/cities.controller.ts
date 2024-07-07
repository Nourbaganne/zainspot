import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
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
  createCity(@Body() createCityDto: CreateCityDto) {
    return this.cityService.createCity(createCityDto);
  }

  @Put(':id')
  updateCity(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.updateCity(+id, updateCityDto);
  }

  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.cityService.removeCity(+id);
  }
}
