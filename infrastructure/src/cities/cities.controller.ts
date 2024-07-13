import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CitiesService } from './cities.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('cities')
export class CitiesController {
  constructor(private readonly cityService: CitiesService) {}

  @Public()
  @Get()
  getCities() {
    return this.cityService.getCities();
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

  @Roles(UserRole.OWNER)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createCity(
    @Body() createCityDto: CreateCityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cityService.createCity(createCityDto, file);
  }

  @Roles(UserRole.OWNER)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateCity(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cityService.updateCity(+id, updateCityDto, file);
  }

  @Roles(UserRole.OWNER)
  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.cityService.removeCity(+id);
  }
}
