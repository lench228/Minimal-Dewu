import { iAddress } from "../definitions";

const getAddress = (url: string) => {
  return {
    id: 0,
    city: "Екатеринбург",
    street: "Вайнера",
    house: 1,
    flat: 1,
  };
};

export const addressFetch = async (link: string) =>
  await new Promise<iAddress>((resolve) => resolve(getAddress(link)));
