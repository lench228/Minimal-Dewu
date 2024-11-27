import React, { useEffect, useReducer } from "react";
import ShipNav from "./shipings-nav/ship-nav";
import { getShipping } from "../../lib/actions/getShipping";
import {
  selectActive,
  selectCurrent,
  selectShippingByActiveType,
  setShipping,
} from "./ship.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectCounters } from "../counter/counter.slice";
import { useSearchParams } from "react-router-dom";
import ShipItem from "./ship-item";

export const TypesTexts = {
  current: "Текущие заказы",
  ended: "Завершенные заказы",
  canceled: "Отмененные заказы",
};

const Ship = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const items = useSelector(selectShippingByActiveType);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const data = await getShipping();
        dispatch(setShipping(data));
      } catch (error) {
        console.error("Failed to fetch shipping:", error);
      } finally {
      }
    };
    setSearchParams({ active: "current" });
    fetchShipping();
  }, []);

  return (
    <section className="flex items-center justify-center flex-col border-[1px] border-black-light-2 mx-16 my-16 pb-10 bg-black-light text-white font-anonymous rounded-xl">
      <ShipNav></ShipNav>
      <ul
        className={
          "bg-black-light w-full px-20 flex items-center flex-col gap-6"
        }
      >
        {items.map((item) => {
          if (item) {
            return <ShipItem key={item.id} {...item}></ShipItem>;
          } else return null;
        })}
      </ul>
    </section>
  );
};

export default Ship;
