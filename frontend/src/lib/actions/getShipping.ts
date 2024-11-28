import { getRandomArrayElement } from "../../utils/utils";
import { Goods } from "../goods";
import { iGood, iShipping, iShippingApi } from "../definitions";

const shippings: iShippingApi = {
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
      userData: {
        fullName: "Пример Примеров",
        phone: "8122940954",
      },
      total: 1000,
      goods: [
        { good: Goods[2], count: 1 },
        { good: Goods[1], count: 9 },
      ],
    },
    {
      id: 9,
      created: "2024-11-20T00:00:00.000Z",
      due: "2024-11-30T00:00:00.000Z",
      address: {
        id: 0,
        city: "New York",
        street: "5th Avenue",
        house: 1,
        flat: 2,
      },
      userData: {
        fullName: "Пример Примеров",
        phone: "8122940954",
      },
      total: 1000,
      goods: [{ good: Goods[2], count: 1 }],
    },
    {
      id: 5,
      created: "2024-11-20T00:00:00.000Z",
      due: "2024-11-30T00:00:00.000Z",
      address: {
        id: 0,
        city: "New York",
        street: "5th Avenue",
        house: 1,
        flat: 2,
      },
      userData: {
        fullName: "Пример Примеров",
        phone: "8122940954",
      },
      total: 1000,
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
      total: 1000,
      address: {
        id: 0,
        city: "New York",
        street: "5th Avenue",
        house: 1,
        flat: 2,
      },
      userData: {
        fullName: "Пример Примеров",
        phone: "8122940954",
      },
      goods: [
        { good: Goods[2], count: 1 },
        { good: Goods[1], count: 3 },
      ],
    },
  ],
  canceled: [],
};

export const getShipping = async () =>
  await new Promise<iShippingApi>((resolve) => resolve(shippings));
