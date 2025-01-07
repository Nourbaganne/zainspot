export default interface PaymentHistory {
	id: number;
	amount: number;
	date: Date;
	status: string;
	method: string;
	stripeSessionId: string;
}
