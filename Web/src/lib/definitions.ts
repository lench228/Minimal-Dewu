export interface iGood extends iApiGood {
  id: number;
  priceRu: number;
}

export interface iApiGood {
  title: string;
  price: number;
  imageUrl: string;
  properties: iStats[];
}

export interface iCartGood {
  count: number;
  good: iGood;
}

export interface iStats {
  name: string;
  value: string;
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

export type TShippingApi = {
  current: iShipping[];
  ended: iShipping[];
  canceled: iShipping[];
};

export interface iOrder {
  id: number;
  userId: string;
  status: string;
  created: Date;
}
