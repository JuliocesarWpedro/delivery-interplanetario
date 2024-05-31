export interface Address {
  planet: string;
  fullName: string;
  mobilePhone: string;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  type: string;
  id: number;
  batch: string;
}

export type AddressType = 'shipping' | 'billing';
