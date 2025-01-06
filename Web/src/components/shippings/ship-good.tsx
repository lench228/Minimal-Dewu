import React from "react";

import { iGood } from "../../lib/definitions";

interface ShipGoodProps {
  good: iGood;
  count: number;
}

const ShipGood: React.FC<ShipGoodProps> = ({ count, good }) => {
  return (
    <li
      className={
        "flex gap-2 p-2  sm:flex-row flex-col justify-between items-center"
      }
      key={good.id}
    >
      <div className={"order-last sm:order-first flex"}>
        <img
          src={good.src}
          width={252}
          className={"rounded-xl"}
          alt={good.name}
        />
      </div>
      <main
        className={"flex flex-col gap-4 p-2 h-full justify-between mr-auto"}
      >
        <h3 className={"font-title text-xl sm:text-3xl"}>{good.name}</h3>
        <ul className={"text-[#838383] h-full"}>
          {Object.entries(good.stats).map(([key, value]) => (
            <li key={value}>
              <span className={"uppercase text-xl"}>{key}: </span>{" "}
              <span className={"underline text-2xl"}>{value}</span>
            </li>
          ))}
        </ul>
        <p
          className={
            "text-2xl border-[1px] border-white-darker-2 flex items-center justify-center w-8"
          }
        >
          {count}
        </p>
      </main>
      <p className={"text-2xl ml-2 "}>{good.priceRU} $</p>
    </li>
  );
};

export default ShipGood;
