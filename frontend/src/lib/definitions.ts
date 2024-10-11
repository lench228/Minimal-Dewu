export interface iGood {
  id: number;
  name: string;

  priceRU: number;
  priceCNY: number;

  size?: string;
  color?: string;
  src: string;
}

export interface iAddress {
  id: number;
  city: string;
  house: number;
  flat: number;
}

export interface iUser {
  id: string;
  fullName: string;
  phone: string;
  address_id: string;
}

export interface iShipping {
  id: number;
  state: string;
  created: Date;
  due: Date;
  address: iAddress;
  orderId: string;
}

export interface iOrder {
  id: string;
  user_id: string;
  status: string;
  created: Date;
}
