import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from 'src/entities/city.entity';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
export declare class CitiesService {
    private cityRepository;
    constructor(cityRepository: Repository<City>);
    getCities({ page, limit }: Pagination, name?: string): Promise<PaginatedResource<Partial<City>>>;
    getCity(id: number): Promise<City>;
    uploadImageToCloudinary(file: Express.Multer.File): Promise<string>;
    createCity(createCityDto: CreateCityDto, file: Express.Multer.File): Promise<City>;
    updateCity(id: number, updateCityDto: UpdateCityDto, file: Express.Multer.File): Promise<City>;
    hideCity(id: number): Promise<City>;
    removeCity(id: number): Promise<City>;
}
