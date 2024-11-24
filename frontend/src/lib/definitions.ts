import { ShippingTypes } from "../components/shippings/ship.slice";

export interface iGood {
  id: number;
  name: string;
  priceRU: number;
  priceCNY: number;

  stats: iStats;

  src: string;
}

export interface iCartGood extends iGood {
  count: number;
}

export interface iStats {
  size?: string;
  color?: string;
}

export interface iAddress {
  id: number;
  city: string;
  street: string;
  house: number;
  flat: number;
}

export interface iUser {
  id: string;
  fullName: string;
  phone: string;
  address_id: number;

  pas?: string;
}

export interface iShipping {
  id: number;
  created: string;
  due: string;
  address: iAddress;
  goods?: { good: iGood; count: number }[];
}

export interface iShippingApi {
  current: iShipping[];
  ended: iShipping[];
  canceled: iShipping[];
}

export interface iOrder {
  id: number;
  user_id: string;
  status: string;
  created: Date;
}
