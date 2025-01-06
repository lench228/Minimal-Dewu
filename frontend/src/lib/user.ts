import { iOrder, iUser } from "./definitions";

export const user: iUser = {
  id: "test1",
  fullName: "Пример Примеров Бебровский",
  phone: "8912482123",
  addressId: 1,
  pas: "1",
  email: "test@test.com",
};

export const order: iOrder = {
  created: new Date(),
  id: 1,
  status: "close",
  userId: "test1",
};
