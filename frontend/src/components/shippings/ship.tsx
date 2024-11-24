import React, { useEffect, useReducer } from "react";
import ShipNav from "./shipings-nav/ship-nav";
import { getShipping } from "../../lib/actions/getShipping";
import { selectActive, selectCurrent, setShipping } from "./ship.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectCounters } from "../counter/counter.slice";

export const TypesTexts = {
  current: "Текущие заказы",
  ended: "Завершенные заказы",
  canceled: "Отмененные заказы",
};

const Ship = () => {
  const dispatch = useDispatch();

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

    fetchShipping();
  }, []);

  return (
    <section className="flex items-center justify-center border-[1px] border-black-light-2 mx-16 my-10 bg-black-light text-white font-anonymous">
      <ShipNav></ShipNav>
    </section>
  );
};

export default Ship;
