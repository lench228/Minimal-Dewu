import React from "react";
import { iGood } from "../../../lib/definitions";

import CartItemControls from "./cart-item-controls";
import CartItemPrice from "./cart-item-price";

interface CartItemProps {
  good: iGood;
}

const CartItem: React.FC<CartItemProps> = ({ good }) => {
  return (
    <li
      className={
        " flex h-72 items-center appearance-auto gap-4 border-b-[1px] p-2 border-white-darker-1 w-full"
      }
      key={good.id}
    >
      <div className="flex flex-col items-center">
        <img
          width={window.screen.width <= 680 ? 140 : 180}
          height={window.screen.width <= 680 ? 120 : 140}
          src={good.src}
          className={"rounded-xl"}
          alt={good.name}
        />
        <CartItemPrice
          id={good.id}
          priceRU={good.priceRU}
          priceCNY={good.priceCNY}
        ></CartItemPrice>
      </div>
      <main className={"pr-2 flex  flex-col items-start gap-4 h-full mt-10 "}>
        <h3 className={"font-main text-xl sm:text-3xl font-normal"}>
          {good.name}
        </h3>
        <ul className={"text-[#838383] sm:ml-4 "}>
          {good.stats.map((value) => (
            <li key={value}>
              <span className={"uppercase text-lg sm:text-xl"}>
                {value.split(":")[0]}:{" "}
              </span>{" "}
              <span className={"underline text-xl  sm:text-2xl"}>
                {value.split(":")[1]}
              </span>
            </li>
          ))}
        </ul>
        <CartItemControls id={good.id} />
      </main>
    </li>
  );
};

export default CartItem;
