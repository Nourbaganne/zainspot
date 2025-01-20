import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from 'src/entities/city.entity';
import cloudinary from 'src/config/cloudinary.config';
import { Pagination } from 'src/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/decorators/dto/paginated-resources.dto';
import { StripeService } from 'src/stripe/stripe.service';
import PerMonth from 'src/interfaces/PerMonth';
import { TranslationService } from 'src/translation/translation.service';
@Injectable()
export class CityService {
	constructor(
		@InjectRepository(City)
		private cityRepository: Repository<City>,
		private stripeService: StripeService,
		private translationService: TranslationService,
	) {}

	async getCities(
		{ page, limit, size, offset, hidden }: Pagination,
		name?: string,
	): Promise<PaginatedResource<Partial<City>>> {
		let queryBuilder = this.cityRepository.createQueryBuilder('city');

		// Apply the name filter globally (for filtering locations by city name)
		if (name) {
			queryBuilder = queryBuilder.andWhere('city.city LIKE :name', {
				name: `%${name}%`,
			});
		}

		// Apply hidden filter if provided
		if (hidden !== undefined) {
			queryBuilder = queryBuilder.andWhere('city.hidden = :hidden', {
				hidden,
			});
		}

		// Add sorting: unhidden cities first, then hidden cities
		queryBuilder = queryBuilder.orderBy('city.hidden', 'ASC');

		// Get total number of locations (all entries in the city table after filters)
		const totalLocations = await queryBuilder.getCount();

		// Get total number of distinct cities after filters
		const totalCitiesQuery = this.cityRepository
			.createQueryBuilder('city')
			.select('COUNT(DISTINCT city.city)', 'count');

		if (name) {
			totalCitiesQuery.andWhere('city.city LIKE :name', { name: `%${name}%` });
		}

		if (hidden !== undefined) {
			totalCitiesQuery.andWhere('city.hidden = :hidden', { hidden });
		}

		const totalCities = await totalCitiesQuery.getRawOne();

		// Get total number of distinct countries after filters
		const totalCountriesQuery = this.cityRepository
			.createQueryBuilder('city')
			.select('COUNT(DISTINCT city.country)', 'count');

		if (name) {
			totalCountriesQuery.andWhere('city.city LIKE :name', {
				name: `%${name}%`,
			});
		}

		if (hidden !== undefined) {
			totalCountriesQuery.andWhere('city.hidden = :hidden', { hidden });
		}

		const totalCountries = await totalCountriesQuery.getRawOne();

		// Apply pagination
		queryBuilder = queryBuilder.take(limit).skip(offset);

		const cities = await queryBuilder.getMany();

		const totalPages = Math.ceil(totalLocations / limit);
		const hasNextPage = page < totalPages;
		const hasPreviousPage = page > 1;

		return {
			totalItems: totalLocations,
			totalCities: Number(totalCities.count),
			totalCountries: Number(totalCountries.count),
			items: cities,
			page,
			size,
			totalPages,
			hasNextPage,
			hasPreviousPage,
		};
	}


	async getHomeCities(): Promise<City[]> {
		// Create a query builder to fetch all cities
		const queryBuilder = this.cityRepository.createQueryBuilder('city');
		
		// Add sorting: unhidden cities first
		const cities = await queryBuilder
			.orderBy('city.hidden', 'ASC')
			.getMany();
	
		return cities;
	}
	
	async getCity(id: number, lang: string = 'en'): Promise<any> {
		const city = await this.cityRepository.findOne({ where: { id } });
		if (!city) {
			throw new NotFoundException('City not found');
		}

		if (!lang || lang === 'usa') {
			lang = 'en';
		}

		const translatedCity = {
			...city,
			description: await this.translationService.translateText(
				city.description,
				'en',
				lang,
			),
			location: {
				...city.location,
				title: await this.translationService.translateText(
					city.location.title,
					'en',
					lang,
				),
			},
		};

		return translatedCity;
	}

	async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{ folder: 'cities' },
				(error, result) => {
					console.log(result);

					if (error) {
						reject(new Error('Image upload failed'));
					}
					resolve(result.secure_url);
				},
			);
			uploadStream.end(file.buffer);
		});
	}

	private async assignStripePriceIdToEachCityPrice(
		city: CreateCityDto,
	): Promise<CreateCityDto> {
		if (city.goldPrice) {
			const gp =
				typeof city.goldPrice === 'string'
					? JSON.parse(city.goldPrice)
					: city.goldPrice;
			console.log('gp', gp);
			const goldPrice = await this.stripeService.stripe.prices.create({
				currency: 'usd',
				unit_amount: gp.amount * 100,
				recurring: {
					interval: 'month',
					interval_count: gp.duration,
				},
				product_data: { name: `${city.city} Gold Membership` },
			});
			gp.stripePriceId = goldPrice.id;
			city.goldPrice =
				typeof city.goldPrice === 'string' ? JSON.stringify(gp) : gp;
		}
		if (city.classicPrice) {
			const cp =
				typeof city.classicPrice === 'string'
					? JSON.parse(city.classicPrice)
					: city.classicPrice;
			cp.perMonth = await Promise.all(
				cp.perMonth
					.filter((price: PerMonth) => price.amount && price.amount != 0)
					.map(async (price: PerMonth) => {
						console.log('price', price);
						const classicPrice = await this.stripeService.stripe.prices.create({
							currency: 'usd',
							unit_amount: price.amount * 100,
							recurring: { interval: 'month', interval_count: price.duration },
							product_data: { name: `${city.city} Classic Membership` },
						});
						return { ...price, stripePriceId: classicPrice.id };
					}),
			);

			city.classicPrice =
				typeof city.classicPrice === 'string' ? JSON.stringify(cp) : cp;
		}

		console.log('city', city);
		return city;
	}

	async createCity(
		createCityDto: CreateCityDto,
		file: Express.Multer.File,
	): Promise<City> {
		if (file) {
			const imageUrl = await this.uploadImageToCloudinary(file);
			createCityDto.imageUrl = imageUrl;
		}
		createCityDto =
			await this.assignStripePriceIdToEachCityPrice(createCityDto);
		const newCity = this.cityRepository.create(createCityDto);
		console.log('new city', newCity);
		return await this.cityRepository.save(newCity);
	}

	private async checkForUpdatedPrices(
		updateCityDto: UpdateCityDto,
		oldCity: City,
	): Promise<UpdateCityDto> {
		const gp =
			typeof updateCityDto.goldPrice === 'string'
				? JSON.parse(updateCityDto.goldPrice)
				: updateCityDto.goldPrice;
		const cp =
			typeof updateCityDto.classicPrice === 'string'
				? JSON.parse(updateCityDto.classicPrice)
				: updateCityDto.classicPrice;

		if (oldCity.goldPrice.amount != gp.amount) {
			console.log('Creating new price for gold membership for', oldCity.city);
			const goldPrice = await this.stripeService.stripe.prices.create({
				currency: 'usd',
				unit_amount: gp.amount,
				recurring: {
					interval: 'month',
					interval_count: gp.duration,
				},
				product_data: { name: `${oldCity.city} Gold Membership` },
			});
			gp.stripePriceId = goldPrice.id;
			updateCityDto.goldPrice =
				typeof updateCityDto.goldPrice === 'string' ? JSON.stringify(gp) : gp;
		}
		console.log('cp', cp);
		cp.perMonth = await Promise.all(
			cp.perMonth.map(async (newPrice: PerMonth) => {
				const oldPrice = oldCity.classicPrice.perMonth.find(
					(price: PerMonth) => price.duration === newPrice.duration,
				) || { amount: 0, duration: newPrice.duration, tax: newPrice.tax };
				if (newPrice.amount == 0) {
					newPrice.stripePriceId = null;
				} else if (oldPrice.amount != newPrice.amount) {
					console.log(
						'Creating new price for classic membership for',
						oldCity.city,
					);
					const classicPrice = await this.stripeService.stripe.prices.create({
						currency: 'usd',
						unit_amount: newPrice.amount,
						recurring: { interval: 'month', interval_count: newPrice.duration },
						product_data: { name: `${oldCity.city} Classic Membership` },
					});
					newPrice.stripePriceId = classicPrice.id;
				}
				return newPrice;
			}),
		);

		updateCityDto.classicPrice =
			typeof updateCityDto.classicPrice === 'string' ? JSON.stringify(cp) : cp;

		return updateCityDto;
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

		const oldCity = await this.cityRepository.findOne({ where: { id } });
		if (!oldCity) {
			throw new NotFoundException('City not found');
		}

		updateCityDto = await this.checkForUpdatedPrices(updateCityDto, oldCity);

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
