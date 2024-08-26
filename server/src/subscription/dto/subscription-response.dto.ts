export class SubscriptionResponseDto {
  id: number;
  startDate: Date;
  endDate: Date;
  optionType: string;
  duration: number;
  price: number;
  city: {
    id: number;
    city: string;
    country: string;
    imageUrl: string;
    locationTitle: string;
  };
  user: {
    id: number;
    email: string;
    businessNumber: string;
  };
  renewal: {
    date: Date;
    status: string
  }
}