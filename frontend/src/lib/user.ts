import { iAddress, iOrder, iShipping, iUser } from "./definitions";

export const user: iUser = {
  id: "test1",
  fullName: "Пример Примеров Бебровский",
  phone: "8912482123",
  address_id: 1,
  pas: "1",
};

export const order: iOrder = {
  created: new Date(),
  id: 1,
  status: "close",
  user_id: "test1",
};
