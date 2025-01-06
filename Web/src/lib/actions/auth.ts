import { iUser } from "../definitions";

const getUser = (url: string) => {
  return {
    id: "0",
    fullName: "Пример Примеров",
    phone: "761235112",
    addressId: 0,
    email: "beb@mail.com",
  };
};

export const authUser = async (link: string) =>
  await new Promise<iUser>((resolve) => resolve(getUser(link)));
