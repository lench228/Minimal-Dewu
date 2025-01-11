import { iGood } from "./definitions";

export const Goods: iGood[] = [
  {
    id: 0,
    title: "adidas originals SUPERSTAR J",
    priceRu: 5452,
    price: 391,
    imageUrl: "/dist/mock-images/superstar.webp",
    properties: [
      { name: "Цвет", value: "черный" },
      { name: "Размер", value: "32US" },
    ],
  },
  {
    id: 1,
    title: "Cavalli Class",

    properties: [
      { name: "Цвет", value: "Белый" },
      { name: "Размер", value: "52" },
    ],
    priceRu: 10291,
    price: 949,
    imageUrl: "/dist/mock-images/cavalli class.webp",
  },
  {
    id: 2,
    title: "adidas Dance FW24 DK PANT ",

    properties: [
      { name: "Цвет", value: "черный" },
      { name: "Размер", value: "XL" },
    ],
    priceRu: 3292,
    price: 299,
    imageUrl: "/dist/mock-images/adidas dance.webp",
  },
  {
    id: 3,
    title: "new balance 1906R",

    properties: [
      { name: "Цвет", value: "серый" },
      { name: "Размер", value: "30US" },
    ],
    priceRu: 1486,
    price: 495,
    imageUrl: "/dist/mock-images/nb-1906R.webp",
  },
];
