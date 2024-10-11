import { getRandomArrayElement } from "../../utils/utils";
import { Goods } from "../goods";

const getGoods = () => {
  return getRandomArrayElement(Goods);
};

export const addGood = async (link: string | null) => {
  const good = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(getGoods());
    }, 1000);
  });

  console.log(good, link);
  return good;
};
