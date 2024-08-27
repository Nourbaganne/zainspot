export default interface Permission {
	id: number;
	action: string;
	resource: string; // table name
}