import { iAddress, iOrder, iShipping, iUser } from "./definitions";

export const user: iUser = {
  id: "test1",
  fullName: "Пример Примеров Бебровский",
  phone: "8912482123",
  address_id: 1,
  pas: "1",
};

export const address: iAddress = {
  city: "ekb",
  flat: 1,
  house: 2,
  id: 1,
};

export const order: iOrder = {
  created: new Date(),
  id: 1,
  status: "close",
  user_id: "test1",
};

export const shipping: iShipping = {
  address: address,
  created: new Date(),
  due: new Date(),
  id: 1,
  orderId: 1,
  state: "",
};
