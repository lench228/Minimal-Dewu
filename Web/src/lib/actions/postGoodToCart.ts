import { getRandomArrayElement } from "../../utils/utils";
import { Goods } from "../goods";
import { iGood } from "../definitions";

const addGood = () => {
  return getRandomArrayElement(Goods);
};

export const postGoodToCart = async (link: string) =>
  await new Promise<iGood>((resolve) => resolve(addGood()));
