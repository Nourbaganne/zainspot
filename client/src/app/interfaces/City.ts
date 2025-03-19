import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import PerMonth from './PerMonth';

export default interface City {
	id?: number;
	city: string;
	imageUrl: string | File;
	country: string;
	hidden: boolean;
	location: { title: string; locationLink: string };
	description: string;
	catchphrase: string;
	goldPrice: PerMonth;
	classicPrice: {
		perMonth: Array<PerMonth>;
	};
	createdAt?: Date;
	updatedAt?: Date;
	stripeId?: string;
}
