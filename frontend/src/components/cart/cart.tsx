import { useDispatch, useSelector } from "react-redux";

import Home from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item/cart-item";
import CartTotal from "./cart-total";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import OrderForm from "../order/order-form";
import { Link } from "react-router-dom";
import clsx from "clsx";

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
    <section
      className={clsx(
        "overflow-y-scroll h-full flex items-center flex-col-reverse sm:w-full  sm:mt-0 sm:flex-row sm:items-center sm:justify-center gap-8 sm:p-10",
      )}
    >
      {isReadyToOrder ? (
        <OrderForm ref={orderFormRef}></OrderForm>
      ) : (
        <Home
          formWidth={window.screen.width > 680 ? "w-1/3" : "w-[90%]"}
        ></Home>
      )}
      {(!isReadyToOrder || window.screen.width > 680) && (
        <form
          className={
            "w-5/6 flex items-center flex-col min-h-800 min-h-[500px] max-h-[600px] sm:h-auto border-black-light-2 mt-12 sm:m-0 border-2 rounded-xl sm:w-2/5 text-white-darker-1 sm:px-10 py-2 justify-center bg-black-light"
          }
        >
          <h2
            className={
              "sm:text-4xl text-2xl font-anonymous font-bold text-center mb-auto"
            }
          >
            Корзина
          </h2>
          {goods.length ? (
            <main className={"mt-auto overflow-y-scroll"}>
              <ul className="">
                {goods.map((good) => (
                  <CartItem key={good.id} good={good} />
                ))}
              </ul>
              <footer className={"flex  flex-col items-center gap-4"}>
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
            <main className="font-anonymous mb-auto border-black-light-2 border-2 rounded-xl flex gap-4 items-center justify-center p-2 w-5/6">
              Пора закупиться
            </main>
          )}
        </form>
      )}
    </section>
  );
};

export default Cart;
