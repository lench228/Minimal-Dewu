import React, { useEffect } from "react";
import { iGood } from "../../../lib/definitions";
import Counter from "../../counter/counter";
import DeleteButton from "../../../assets/icons/deleteButton";
import counter from "../../counter/counter";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  addCounter,
  selectCounterById,
  selectCounters,
} from "../../counter/counter.slice";
import { removeAllGood } from "../cart-slice";
import CartTotal from "../cart-total";
import CartItemControls from "./cart-item-controls";
import CartItemPrice from "./cart-item-price";

interface CartItemProps {
  good: iGood;
}

const CartItem: React.FC<CartItemProps> = ({ good }) => {
  return (
    <li
      className={"flex gap-2 border-b-[1px] p-2 border-white-darker-1"}
      key={good.id}
    >
      <div>
        <img
          src={good.src}
          width={163}
          height={126}
          className={"rounded-xl"}
          alt={good.name}
        />
        <CartItemPrice
          id={good.id}
          priceRU={good.priceRU}
          priceCNY={good.priceCNY}
        ></CartItemPrice>
      </div>
      <main className={"pr-2 flex flex-col gap-1 w-full"}>
        <h3 className={"font-anonymous text-2xl "}>{good.name}</h3>
        <ul className={"text-[#838383]"}>
          {Object.entries(good.stats).map(([key, value]) => (
            <li key={value}>
              <span className={"uppercase text-xl"}>{key}: </span>{" "}
              <span className={"underline text-2xl"}>{value}</span>
            </li>
          ))}
        </ul>
        <CartItemControls id={good.id} />
      </main>
    </li>
  );
};

export default CartItem;
