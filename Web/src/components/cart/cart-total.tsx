import React from "react";
import { useSelector } from "react-redux";
import { selectCount, selectTotal } from "./cart-slice";
import { selectCounterById } from "../counter/counter.slice";

const CartTotal = () => {
  const count = useSelector(selectCount);
  const total = useSelector(selectTotal);

  return (
    <section
      className={
        "flex flex-col font-anonymous text-xl  rounded-xl border-[1px] w-3/4 border-black-light-2  px-5 py-2 m-auto mt-7"
      }
    >
      <div className={"font-normal"}>
        <p className={"flex justify-between px-2"}>
          <span>Товары, {count}шт.</span>
          <span>{total} ₽</span>
        </p>
      </div>
      <div className={"text-3xl font-bold"}>
        <p className={"flex justify-between"}>
          <span>Итого</span>
          <span>{total} ₽</span>
        </p>
      </div>
    </section>
  );
};

export default CartTotal;
