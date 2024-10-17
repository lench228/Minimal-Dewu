import { getRandomArrayElement } from "../../utils/utils";
import { Goods } from "../goods";
import { iGood } from "../definitions";

const getGoods = () => {
  return getRandomArrayElement(Goods);
};

export const findGood = async (link: string) =>
  await new Promise<iGood>((resolve) => resolve(getGoods()));
