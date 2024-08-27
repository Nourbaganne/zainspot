import Role from "./Role";

export default interface User {
  id: number;
  name: string;
  middlename?: string;
  lastName: string;
  businessName: string;
  email: string;
  businessNumber: string;
  subscriptions: { city: { city: string }, endDate: string }[];
  role: Role;
}