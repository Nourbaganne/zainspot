import { Subscription } from './subscription.entity';
interface PerMonth {
    duration: number;
    amount: number;
    tax: number;
}
export declare class City {
    id: number;
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
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    subscriptions: Subscription[];
}
export {};
