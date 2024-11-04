import React from "react";
import { iGood } from "../../lib/definitions";
import Counter from "../counter/counter";
import DeleteButton from "../../assets/icons/deleteButton";
import counter from "../counter/counter";
import { useDispatch, useSelector } from "react-redux";
import { selectCounterById, selectCounters } from "../counter/counter.slice";
import { removeGood } from "./cart-slice";

interface CartItemProps {
  good: iGood;
}

const arrow = (
  <svg
    width="18"
    height="8"
    viewBox="0 0 18 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 3.99994H16.5M16.5 3.99994C16.3933 3.14661 15.156 1.43994 11.06 1.43994M16.5 3.99994C16.0733 4.85327 14.388 6.55994 11.06 6.55994"
      stroke="#EAEAEA"
    />
  </svg>
);

const CartItem: React.FC<CartItemProps> = ({ good }) => {
  const counter = useSelector(selectCounterById(good.name));
  const dispatch = useDispatch();
  return (
    <li
      key={good.id}
      className={"flex gap-2 border-b-[1px] p-2 border-white-darker-1"}
    >
      <div>
        <img src={good.src} width={163} height={126} className={"rounded-xl"} />
        <footer className={"flex items-center gap-1 justify-center mt-2"}>
          {counter && good.priceCNY * counter.count}¥{arrow}
          {counter && good.priceRU * counter.count}₽
        </footer>
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
        <div className={"flex justify-between pt-2"}>
          <Counter name={good.name}></Counter>
          <DeleteButton
            onClick={() => {
              dispatch(removeGood(good.id));
            }}
          ></DeleteButton>
        </div>
      </main>
    </li>
  );
};

export default CartItem;
