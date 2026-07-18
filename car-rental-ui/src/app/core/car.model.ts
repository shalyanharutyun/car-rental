export type RentalPeriod = 'DAILY' | 'MONTHLY';
export type Currency = 'USD' | 'AMD' | 'RUB';
export type FuelType = 'PETROL' | 'DIESEL' | 'GAS';
export type SellerType = 'OWNER' | 'DEALER';
export type SteeringWheel = 'LEFT' | 'RIGHT';

export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  rentalPeriod: RentalPeriod;
  currency: Currency;
  fuelType: FuelType;
  description?: string;
  vin: string;
  sellerType?: SellerType;
  location?: string;
  mileage?: number;
  currentCondition?: string;
  gasEquipment?: boolean;
  steeringWheel?: SteeringWheel;
  clearedCustoms?: boolean;
  exchangePossible?: boolean;
  color?: string;
  wheelSize?: number;
  headlights?: string;
  interiorColor?: string;
  interiorMaterial?: string;
  sunroof?: boolean;
  comfort?: string;
  available?: boolean;
  rentedUntil?: string;
  images?: string[];
  ownerEmail?: string;
  phoneNumber?: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}