import PerMonth from './PerMonth';

export default interface City {
	id?: number;
	city: string;
	imageUrl: File | null;
	country: string;
	hidden: boolean;
	location: { title: string; locationLink: string };
	description: string;
	catchphrase: string;
	goldPrice: PerMonth;
	classicPrice: {
		perMonth: Array<PerMonth>;
	};
	createdAt: Date;
	updatedAt: Date;
}
