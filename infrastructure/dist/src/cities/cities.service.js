"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("../entities/city.entity");
const cloudinary_config_1 = require("../config/cloudinary.config");
let CitiesService = class CitiesService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    async getCities({ page, limit = 1 }, name) {
        let queryBuilder = this.cityRepository.createQueryBuilder('city');
        if (name) {
            queryBuilder = queryBuilder.andWhere(`city.city LIKE :name`, { name: `%${name}%` });
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
    async getCity(id) {
        const city = await this.cityRepository.findOne({ where: { id } });
        if (!city) {
            throw new common_1.NotFoundException('City not found');
        }
        return city;
    }
    async uploadImageToCloudinary(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_config_1.default.uploader.upload_stream({ folder: 'cities' }, (error, result) => {
                if (error) {
                    reject(new Error('Image upload failed'));
                }
                resolve(result.secure_url);
            });
            uploadStream.end(file.buffer);
        });
    }
    async createCity(createCityDto, file) {
        if (file) {
            const imageUrl = await this.uploadImageToCloudinary(file);
            createCityDto.imageUrl = imageUrl;
        }
        const newCity = this.cityRepository.create(createCityDto);
        return await this.cityRepository.save(newCity);
    }
    async updateCity(id, updateCityDto, file) {
        if (file) {
            const imageUrl = await this.uploadImageToCloudinary(file);
            updateCityDto.imageUrl = imageUrl;
        }
        await this.cityRepository.update(id, updateCityDto);
        const updatedCity = await this.cityRepository.findOne({ where: { id } });
        if (!updatedCity) {
            throw new common_1.NotFoundException('City not found');
        }
        return updatedCity;
    }
    async hideCity(id) {
        const city = await this.getCity(id);
        city.hidden = !city.hidden;
        await this.cityRepository.save(city);
        return city;
    }
    async removeCity(id) {
        const city = await this.getCity(id);
        await this.cityRepository.remove(city);
        return city;
    }
};
exports.CitiesService = CitiesService;
exports.CitiesService = CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CitiesService);
//# sourceMappingURL=cities.service.js.map