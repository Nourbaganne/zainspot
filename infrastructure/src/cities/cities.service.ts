import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from 'src/entities/city.entity';
import cloudinary from 'src/config/cloudinary.config';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) { }

  async getCities(
    { page, limit = 1 }: Pagination,
    name?: string,
  ): Promise<PaginatedResource<Partial<City>>> {
    let queryBuilder = this.cityRepository.createQueryBuilder('city');

    // Apply the name filter globally
    if (name) {
      queryBuilder = queryBuilder.andWhere(
        `city.city LIKE :name`,
        { name: `%${name}%` }
      );
    }

    const total = await queryBuilder.getCount();

    
    queryBuilder = queryBuilder.take(limit).skip((page - 1) * limit);

    const cities = await queryBuilder.getMany();

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      totalItems: total,
      items: cities,
      page,
      size: limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }


  async getCity(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'cities' },
        (error, result) => {
          if (error) {
            reject(new Error('Image upload failed'));
          }
          resolve(result.secure_url);
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async createCity(
    createCityDto: CreateCityDto,
    file: Express.Multer.File,
  ): Promise<City> {
    if (file) {
      const imageUrl = await this.uploadImageToCloudinary(file);
      createCityDto.imageUrl = imageUrl;
    }
    const newCity = this.cityRepository.create(createCityDto);
    return await this.cityRepository.save(newCity);
  }

  async updateCity(
    id: number,
    updateCityDto: UpdateCityDto,
    file: Express.Multer.File,
  ): Promise<City> {
    if (file) {
      const imageUrl = await this.uploadImageToCloudinary(file);
      updateCityDto.imageUrl = imageUrl;
    }
    await this.cityRepository.update(id, updateCityDto);
    const updatedCity = await this.cityRepository.findOne({ where: { id } });
    if (!updatedCity) {
      throw new NotFoundException('City not found');
    }
    return updatedCity;
  }

  async hideCity(id: number): Promise<City> {
    const city = await this.getCity(id);
    city.hidden = !city.hidden;
    await this.cityRepository.save(city);
    return city;
  }
  
  async removeCity(id: number): Promise<City> {
    const city = await this.getCity(id);
    await this.cityRepository.remove(city);
    return city;
  }
}
