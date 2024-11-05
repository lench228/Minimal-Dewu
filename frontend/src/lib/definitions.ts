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
  state: string;
  created: Date;
  due: Date;
  address: iAddress;
  orderId: number;
}

export interface iOrder {
  id: number;
  user_id: string;
  status: string;
  created: Date;
}
