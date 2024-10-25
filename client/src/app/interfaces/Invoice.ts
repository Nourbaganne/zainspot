export default interface Invoice {
	id: number;
	dateIssued: string;
	dueDate: string;
	amount: number;
	status: string;
}
