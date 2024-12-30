import City from './City';
import PaymentHistory from './PaymentHistory';

export default interface Subscription {
	id: number;
	cityId: number;
	price: number;
	userId: number;
	paymentId?: number; // References payment_history table
	optionType: string;
	duration: number;
	startDate: Date;
	endDate: Date;
	renewalDate?: Date;
	renewalStatus?: string;
	paymentHistory?: PaymentHistory;
	city?: City;
}
