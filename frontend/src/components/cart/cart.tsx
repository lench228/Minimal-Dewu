import { useDispatch, useSelector } from "react-redux";

import Home from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item";
import CartTotal from "./cart-total";
import React, { useState } from "react";
import { Button } from "../ui/button";
import OrderForm from "../order/order-form";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isReadyToOrder, setIsReadyToOrder] = useState(false);
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);

  const onOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <section className="w-full flex gap-10 items-center justify-center h-full">
      {!isReadyToOrder ? (
        <Home inputWidth={"600px"}></Home>
      ) : (
        <OrderForm></OrderForm>
      )}
      <form
        onSubmit={(e) => onOrderSubmit(e)}
        className={
          "border-black-light-2 border-2 rounded-xl w-2/5 text-white-darker-1 px-10 py-2 justify-center bg-black-light"
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
              {!isReadyToOrder ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsReadyToOrder(true);
                  }}
                >
                  <p>Оформить</p>
                </Button>
              ) : (
                <>
                  <Button>
                    <p>Заказать</p>
                  </Button>
                  <a
                    className={"font-anonymous underline font-normal italic"}
                    onClick={() => setIsReadyToOrder(false)}
                  >
                    добавить товары
                  </a>
                </>
              )}
            </footer>
          </main>
        ) : (
          <main className=" border-black-light-2 border-2 rounded-xl flex gap-4 items-center justify-center p-2">
            Пусто
          </main>
        )}
      </form>
      )
    </section>
  );
};

export default Cart;
