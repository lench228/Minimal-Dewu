import { iGood } from "./definitions";

export const Goods: iGood[] = [
  {
    id: 0,
    name: "cap very cool cap",

    priceRU: 124,
    priceCNY: 120,
    src: "/mock-images/cap.webp",
    stats: {
      atr: ["Цвет Оранжевый"],
    },
  },
  {
    id: 1,
    name: "humster click click 2 text",

    stats: {
      atr: ["Цвет Оранжевый"],
    },

    priceRU: 1200,
    priceCNY: 124,
    src: "/mock-images/humster.webp",
  },
  {
    id: 2,
    name: "adidas штанцы luch asodwe",
    stats: {
      atr: ["Цвет Оранжевый", "Размер 12US"],
    },
    priceRU: 124,
    priceCNY: 999,
    src: "/mock-images/krytie-shtani.webp",
  },
  {
    id: 3,
    name: "new balance 1906R",

    stats: {
      atr: ["Цвет Оранжевый", "Размер 30US"],
    },
    priceRU: 124,
    priceCNY: 1200,
    src: "/mock-images/nb-1906R.webp",
  },
];
