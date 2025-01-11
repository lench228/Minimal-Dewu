export interface iGood {
  id: number;
  name: string;
  priceRU: number;
  priceCNY: number;
  stats: string[];
  src: string;
}

export interface iCartGood extends iGood {
  count: number;
}

export interface iStats {
  atr: string[];
}

export type TUserInfo = {
  fullName: string;
  phone: string;
  email: string;
};

export interface iAddress {
  city: string;
  street: string;
  building: string;
  apartment: string;
}

export interface iUser {
  address: iAddress;
  userInfo: TUserInfo;
}

export interface iShipping {
  id: number;
  created: string;
  due: string;
  address: iAddress;
  total: number;
  userData: { fullName: string; phone: string };
  goods?: { good: iGood; count: number }[];
}

export interface iShippingApi {
  current: iShipping[];
  ended: iShipping[];
  canceled: iShipping[];
}

export interface iOrder {
  id: number;
  userId: string;
  status: string;
  created: Date;
}
