// @flow
import * as React from "react";
import { iGood, iStats } from "../../../lib/definitions";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectGood, setActivePopup } from "../../home/home-slice";
import { addGood, selectGoods } from "../../cart/cart-slice";
import { useNavigate } from "react-router-dom";
import { addCounter } from "../../counter/counter.slice";

type Props = {
  good: iGood | null;
};

export const GoodPopup = ({ ...props }: Props) => {
  const nav = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.good) {
      dispatch(addGood({ ...props.good, count: 1 }));
      dispatch(addCounter(props.good.id));
    }
    dispatch(setActivePopup(""));
    nav("/cart");
  };

  const dispatch = useDispatch();

  return props.good ? (
    <form
      className={
        "flex w-2/5 flex-col p-20 gap-4 justify-center items-center m-auto bg-black-light border-2 border-black-light-2 rounded-xl text-white-darker-1 font-anonymous"
      }
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <header>
        <h2 className={"text-4xl text-center font-bold"}>{props.good.name}</h2>
        <h3 className={"text-xl text-center font-bold"}>
          {props.good.priceCNY}¥
        </h3>
      </header>
      <main className={"max-w-screen-sm flex flex-col items-center gap-3"}>
        <img
          src={props.good.src}
          alt={props.good.name}
          height={380}
          width={380}
          className={"rounded-xl"}
        />
        <div>
          <svg
            width="608"
            height="2"
            viewBox="0 0 608 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"mb-3"}
          >
            <line
              x1="0.481201"
              y1="1.08496"
              x2="607.519"
              y2="1.08496"
              stroke="#D5D5D5"
            />
          </svg>
          <ul className={"flex justify-center gap-3 text-2xl font-bold"}>
            {Object.entries(props.good.stats).map(([key, value]) => {
              return (
                <li key={key} className={""}>
                  <span>
                    {key}: {value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Button onClick={(e) => {}}>Добавить в корзину</Button>
    </form>
  ) : (
    <div>
      <p>err</p>
    </div>
  );
};
