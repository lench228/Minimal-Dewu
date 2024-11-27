import { useDispatch, useSelector } from "react-redux";

import Home from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item/cart-item";
import CartTotal from "./cart-total";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import OrderForm from "../order/order-form";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isReadyToOrder, setIsReadyToOrder] = useState(false);
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);

  const orderFormRef = useRef<HTMLFormElement | null>(null);

  const handleOrderSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (orderFormRef.current) {
      orderFormRef.current.NoValidate = true;
      orderFormRef.current.requestSubmit();
    }
  };

  return (
    <section className="flex items-center justify-center h-full gap-8 p-10">
      {!isReadyToOrder ? (
        <Home formWidth={"w-1/3"}></Home>
      ) : (
        <OrderForm ref={orderFormRef}></OrderForm>
      )}
      <form
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
                  <Button
                    onClick={(e) => {
                      handleOrderSubmit(e);
                    }}
                  >
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
    </section>
  );
};

export default Cart;
