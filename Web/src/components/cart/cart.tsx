import { useSelector } from "react-redux";

import Home from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item/cart-item";
import CartTotal from "./cart-total";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import OrderForm from "../order/order-form";

import clsx from "clsx";

const Cart = () => {
  const [isReadyToOrder, setIsReadyToOrder] = useState(false);

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
        "overflow-y-scroll  sm:h-full flex items-center flex-col-reverse w-full  sm:mt-0 sm:flex-row sm:items-center sm:justify-center gap-8 sm:p-10 ",
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
            "w-5/6 flex items-center flex-col h-5/6  border-black-light-2 mt-12 sm:m-0 border-2 rounded-xl sm:w-3/5 text-white-darker-1 sm:px-10 py-6 justify-center bg-black-light"
          }
        >
          <h2
            className={
              "sm:text-4xl text-2xl font-title font-bold text-center mb-6"
            }
          >
            Корзина
          </h2>
          {goods.length ? (
            <main className={"overflow-y-scroll w-full"}>
              <ul className="w-full">
                {goods.map((good) => (
                  <CartItem key={good.good.id} good={good.good} />
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
                      className={"font-main underline font-normal italic"}
                      onClick={() => setIsReadyToOrder(false)}
                    >
                      добавить товары
                    </a>
                  </>
                )}
              </footer>
            </main>
          ) : (
            <main
              className={
                "flex items-center flex-col justify-center w-3/4 h-full"
              }
            >
              <img
                src={"./dist/illustrations/empty-cart.png"}
                className={"h-1/2 w-1/2"}
              />
              <h2 className={"text-2xl font-title mb-12"}>Корзина пуста =(</h2>
            </main>
          )}
        </form>
      )}
    </section>
  );
};

export default Cart;
