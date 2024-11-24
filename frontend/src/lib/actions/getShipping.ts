import { getRandomArrayElement } from "../../utils/utils";
import { Goods } from "../goods";
import { iGood, iShippingApi } from "../definitions";

const shippings = {
  current: [
    {
      id: 1,
      created: "2024-11-20T00:00:00.000Z",
      due: "2024-11-30T00:00:00.000Z",
      address: {
        id: 0,
        city: "New York",
        street: "5th Avenue",
        house: 1,
        flat: 2,
      },
      goods: [
        { good: Goods[2], count: 1 },
        { good: Goods[1], count: 3 },
      ],
    },
  ],
  ended: [
    {
      id: 2,
      created: "2024-10-10T00:00:00.000Z",
      due: "2024-10-15T00:00:00.000Z",
      address: {
        id: 0,
        city: "New York",
        street: "5th Avenue",
        house: 1,
        flat: 2,
      },
      goods: [
        { good: Goods[2], count: 1 },
        { good: Goods[1], count: 3 },
      ],
    },
  ],
  canceled: [
    {
      id: 3,
      created: "2024-09-05T00:00:00.000Z",
      due: "2024-09-10T00:00:00.000Z",
      address: {
        id: 0,
        city: "New York",
        street: "5th Avenue",
        house: 1,
        flat: 2,
      },
      goods: [
        { good: Goods[2], count: 1 },
        { good: Goods[1], count: 3 },
      ],
    },
  ],
};

export const getShipping = async () =>
  await new Promise<iShippingApi>((resolve) => resolve(shippings));
