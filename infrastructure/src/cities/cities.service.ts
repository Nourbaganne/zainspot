import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from 'src/entities/city.entity';
import cloudinary from 'src/config/cloudinary.config';
@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async getCities(): Promise<City[]> {
    return await this.cityRepository.find();
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
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  async createCity(createCityDto: CreateCityDto, file: Express.Multer.File): Promise<City> {
    if (file) {
      const imageUrl = await this.uploadImageToCloudinary(file);
      createCityDto.imageUrl = imageUrl;
    }
    const newCity = this.cityRepository.create(createCityDto);
    return await this.cityRepository.save(newCity);
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto, file: Express.Multer.File): Promise<City> {
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

  async removeCity(id: number): Promise<City> {
    const city = await this.getCity(id);
    await this.cityRepository.remove(city);
    return city;
  }
}
