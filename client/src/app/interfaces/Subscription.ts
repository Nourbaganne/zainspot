export default interface Subscription {
	id: number;
	cityId: number;
	userId: number;
	paymentId?: number; // References payment_history table
	optionType: string;
	duration: number;
	startDate: Date;
	endDate: Date;
	renewalDate?: Date;
	renewalStatus?: string;
}
