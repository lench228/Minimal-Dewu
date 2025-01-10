import { iOrder, iUser } from "./definitions";

export const user: iUser = {
  userInfo: {
    fullName: "Пример Примеров Бебровский",
    phone: "8912482123",
    email: "test@test.com",
  },
  address: {
    city: "",
    street: "",
    building: "9",
    apartment: "0",
  },
};

export const order: iOrder = {
  created: new Date(),
  id: 1,
  status: "close",
  userId: "test1",
};
