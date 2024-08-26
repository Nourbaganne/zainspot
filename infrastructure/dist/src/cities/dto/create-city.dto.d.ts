interface PerMonth {
    duration: number;
    amount: number;
    tax: number;
}
export declare class CreateCityDto {
    city: string;
    country: string;
    hidden: boolean;
    location: {
        title: string;
        locationLink: string;
    };
    description: string;
    goldPrice: {
        value: number;
        tax: number;
    };
    classicPrice: {
        perMonth: PerMonth[];
    };
    imageUrl?: string;
}
export {};
