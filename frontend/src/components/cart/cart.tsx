import { useDispatch, useSelector } from "react-redux";

import Home from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item";
import CartTotal from "./cart-total";
import React from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);
  return (
    <section className="w-full flex gap-10 items-center justify-center h-full">
      <Home inputWidth={"600px"}></Home>
      <section
        className={
          "border-black-light-2 border-2 rounded-xl w-2/5 text-white-darker-1 px-10 py-2 justify-center"
        }
      >
        <h2 className={"text-4xl font-anonymous font-bold text-center"}>
          Корзина
        </h2>
        <ul className="">
          {goods.map((good) => (
            <CartItem key={good.id} good={good} />
          ))}
        </ul>
        <footer>
          <CartTotal></CartTotal>
        </footer>
      </section>
    </section>
  );
};

export default Cart;
