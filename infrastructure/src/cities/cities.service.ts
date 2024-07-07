import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from 'src/entities/city.entity';

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

  async createCity(createCityDto: CreateCityDto): Promise<City> {
    const newCity = this.cityRepository.create(createCityDto);
    return await this.cityRepository.save(newCity);
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto): Promise<City> {
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
