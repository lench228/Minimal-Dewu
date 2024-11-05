import React from "react";
import { useSelector } from "react-redux";
import { selectCount, selectTotal } from "./cart-slice";
import { selectCounterById } from "../counter/counter.slice";

const CartTotal = () => {
  const count = useSelector(selectCount);
  const total = useSelector(selectTotal);

  return (
    <section>
      <p>
        Товары, <span>{count}</span>шт.
      </p>
      <p>
        Итого <span>{total}</span>
      </p>
    </section>
  );
};

export default CartTotal;
