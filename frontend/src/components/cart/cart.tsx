import { useDispatch, useSelector } from "react-redux";

import Home from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item";
import CartTotal from "./cart-total";
import React from "react";
import { Button } from "../ui/button";

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
        {goods.length ? (
          <main>
            <ul className="">
              {goods.map((good) => (
                <CartItem key={good.id} good={good} />
              ))}
            </ul>
            <footer className={"flex flex-col items-center gap-4"}>
              <CartTotal></CartTotal>
              <Button onClick={() => {}}>
                <p>Оформить</p>
              </Button>
            </footer>
          </main>
        ) : (
          <main className=" border-black-light-2 border-2 rounded-xl flex gap-4 items-center justify-center p-2">
            Пусто
          </main>
        )}
      </section>
      )
    </section>
  );
};

export default Cart;
