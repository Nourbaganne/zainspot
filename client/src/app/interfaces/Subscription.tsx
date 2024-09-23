export default interface Subscription {
	id?: number;
	startDate: Date;
	endDate: Date;
	optionType: string;
	duration: number;
	price: number;
	userId?: number; // TODO: make sure to get userId from the auth middleware in the server side if not provided
	cityId: number;
}
