import React, { useEffect } from "react";
import ShipNav from "./ship-nav/ship-nav";

import { selectShippingByActiveType, setShipping } from "./model/ship.slice";
import { useDispatch, useSelector } from "react-redux";

import ShipItem from "./ship-item";
import { getShipping } from "../../lib/actions/getShipping";
import { getOrdersThunk } from "./model/actions";
import { AppDispatch } from "../../services/store";

export const TypesTexts = {
  current: "Текущие",
  ended: "Завершенные",
  canceled: "Отмененные",
};

const Ship = () => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(selectShippingByActiveType);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return (
    items && (
      <section className="h-5/6 flex-col-reverse sm:flex-col  flex overflow-y-scroll sm:overflow-y-hidden  w-full  mx-auto justify-end   items-start sm:justify-start border-[1px] border-black-light-2 sm:mx-16 sm:my-16  pb-10 bg-black-light text-white font-roboto rounded-xl">
        <meta translate={"yes"} lang={"RU"} />
        <ShipNav></ShipNav>

        <ul
          className={
            "overflow-y-scroll bg-black-light w-full p-4 sm:px-20 flex items-center flex-col gap-6  sm:p-10"
          }
        >
          {items.map((item) => {
            if (item) {
              return <ShipItem key={item.id} {...item}></ShipItem>;
            } else return null;
          })}
        </ul>
      </section>
    )
  );
};

export default Ship;
