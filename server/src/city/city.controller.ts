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
import {
	Pagination,
	PaginationParams,
} from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { City } from 'src/entities/city.entity';
import { Permissions } from 'src/decorators/permissions.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('city')
export class CityController {
	constructor(private readonly cityService: CityService) {}

	@Public()
	@Get()
	getCities(
		@PaginationParams() paginationParams: Pagination,
		@Query('name') name?: string,
	): Promise<PaginatedResource<Partial<City>>> {
		return this.cityService.getCities(paginationParams, name);
	}

	@Public()
	@Get('/home')
	getHomeCities(){
		return this.cityService.getHomeCities();
	}

	@Public()
	@Get(':id')
	getOneCity(
		@Param('id') id: string,
		@Query('lang') lang?: string,
	) {
		try {
			return this.cityService.getCity(+id, lang);
		} catch (err) {
			throw new NotFoundException();
		}
	}

	@Permissions({ action: 'create', subject: 'city' })
	@Post()
	@UseInterceptors(FileInterceptor('imageUrl'))
	createCity(
		@Body() createCityDto: CreateCityDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.cityService.createCity(createCityDto, file);
	}

	@Permissions({ action: 'update', subject: 'city' })
	@Patch(':id')
	@UseInterceptors(FileInterceptor('image'))
	updateCity(
		@Param('id') id: string,
		@Body() updateCityDto: UpdateCityDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.cityService.updateCity(+id, updateCityDto, file);
	}

	@Permissions({ action: 'update', subject: 'city' })
	@Patch(':id/hide')
	async hideCity(@Param('id') id: number) {
		return this.cityService.hideCity(id);
	}

	@Permissions({ action: 'delete', subject: 'city' })
	@Delete(':id')
	removeCity(@Param('id') id: string) {
		return this.cityService.removeCity(+id);
	}
}
