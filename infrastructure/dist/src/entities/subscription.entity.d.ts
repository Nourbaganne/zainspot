import { User } from './user.entity';
import { City } from './city.entity';
export declare class Subscription {
    id: number;
    user: User;
    city: City;
    startDate: Date;
    endDate: Date;
    optionType: string;
    duration: number;
    price: number;
    renewalDate: Date;
    renewalStatus: string;
}
