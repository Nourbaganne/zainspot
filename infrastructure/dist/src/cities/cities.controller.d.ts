import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CitiesService } from './cities.service';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { City } from 'src/entities/city.entity';
export declare class CitiesController {
    private readonly cityService;
    constructor(cityService: CitiesService);
    getCities(paginationParams: Pagination, name?: string): Promise<PaginatedResource<Partial<City>>>;
    getOneCity(id: string): Promise<City>;
    createCity(createCityDto: CreateCityDto, file: Express.Multer.File): Promise<City>;
    updateCity(id: string, updateCityDto: UpdateCityDto, file: Express.Multer.File): Promise<City>;
    hideCity(id: number): Promise<City>;
    removeCity(id: string): Promise<City>;
}
