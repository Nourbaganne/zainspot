interface PerMonth {
	duration: number;
	amount: number;
	tax: number;
}

export interface CityProps {
	id: number;
	city: string;
	country: string;
	hidden: boolean;
	location: { title: string };
	goldPrice: PerMonth;
	classicPrice: { perMonth: PerMonth[] };
}

export const LOCATION_LIST_HEADER = [
	'Location',
	'City & Country',
	'ZS Gold',
	'ZS Classic',
];

export const BREADCRUMB_ITEMS = [
	{ label: 'owner_dashboard', href: '/owner' },
	{ label: 'locations' },
];
