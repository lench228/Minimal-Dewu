import React from "react";
import CartItemPrice from "../cart/cart-item/cart-item-price";
import CartItemControls from "../cart/cart-item/cart-item-controls";
import { iGood } from "../../lib/definitions";

interface ShipGoodProps {
  good: iGood;
  count: number;
}

const ShipGood: React.FC<ShipGoodProps> = ({ count, good }) => {
  return (
    <li className={"flex gap-2 p-2 justify-center"} key={good.id}>
      <div>
        <img
          src={good.src}
          width={163}
          height={126}
          className={"rounded-xl"}
          alt={good.name}
        />
      </div>
      <main className={"p-2 flex flex-col gap-1 justify-center"}>
        <h3 className={"font-anonymous text-2xl "}>{good.name}</h3>
        <ul className={"text-[#838383]"}>
          {Object.entries(good.stats).map(([key, value]) => (
            <li key={value}>
              <span className={"uppercase text-xl"}>{key}: </span>{" "}
              <span className={"underline text-2xl"}>{value}</span>
            </li>
          ))}
        </ul>
        <p
          className={
            "mt-auto text-2xl border-[1px] border-white-darker-2 flex items-center justify-center w-8"
          }
        >
          {count}
        </p>
      </main>
      <p className={"text-2xl ml-2"}>{good.priceRU} $</p>
    </li>
  );
};

export default ShipGood;
