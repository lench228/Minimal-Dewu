// @flow
import * as React from "react";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";

import { addGood } from "../../cart/cart-slice";
import { useNavigate } from "react-router-dom";
import { addCounter } from "../../counter/counter.slice";
import { selectGood } from "../../home/model/home-slice";
import { selectError } from "../auth/model/auth.slice";
import { Navigate } from "react-router";

export const GoodPopup = () => {
  const nav = useNavigate();
  const good = useSelector(selectGood);
  const error = useSelector(selectError);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (good) {
      dispatch(addGood({ good, count: 1 }));
      dispatch(addCounter(good.id));
    }

    nav("/cart");
  };

  const dispatch = useDispatch();
  if (error === "Войдите в аккаунт") {
    return <Navigate replace to={"/login"} />;
  }
  return good ? (
    <form
      className={
        "flex w-5/6 sm:w-3/5 flex-col p-[4%] gap-4 justify-center items-center m-auto bg-black-light border-2 border-black-light-2 rounded-xl text-white-darker-1 font-main"
      }
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <header>
        <h2 className={"sm:text-4xl text-xl text-center font-title font-bold"}>
          {good.title}
        </h2>
        <h3 className={"sm:text-xl text-lg text-center mt-2 mb-2"}>
          {good.price}¥
        </h3>
      </header>
      <main className={"max-w-screen-sm flex flex-col items-center gap-3"}>
        <img
          src={good.imageUrl}
          alt={good.title}
          height={window.screen.width > 680 ? 380 : 160}
          width={window.screen.width > 680 ? 380 : 140}
          className={"rounded-xl"}
        />
        <div>
          <svg
            width="100%"
            height="4"
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
              stroke="#fff"
            />
          </svg>
          <ul
            className={
              "flex justify-center gap-12 text-xl sm:text-2xl font-bold"
            }
          >
            {good.properties.map((value) => (
              <li key={value.name} className={""}>
                <span>{value.name}</span>: <span>{value.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Button onClick={(e) => {}}>Добавить в корзину</Button>
    </form>
  ) : (
    <div className={"flex m-auto flex-col items-center"}>
      <img
        width={"600"}
        height={"600"}
        alt={"Товар не найден"}
        src={"../dist/illustrations/error-404.png"}
      />
      <p
        className={
          "font-main font-bold text-3xl text-white-darker-1 align-middle"
        }
      >
        Товар не найден, попробуйте позже
      </p>
    </div>
  );
};
