import React, { useEffect } from "react";
import ShipNav from "./ship-nav/ship-nav";
import { getShipping } from "../../lib/actions/getShipping";
import { selectShippingByActiveType, setShipping } from "./ship.slice";
import { useDispatch, useSelector } from "react-redux";

import ShipItem from "./ship-item";

export const TypesTexts = {
  current: "Текущие",
  ended: "Завершенные",
  canceled: "Отмененные",
};

const Ship = () => {
  const dispatch = useDispatch();

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

    fetchShipping();
  });

  return (
    <section className="h-full flex-col-reverse sm:flex-col  flex overflow-y-scroll sm:overflow-y-hidden  w-full  mx-auto justify-end   items-start sm:justify-start border-[1px] border-black-light-2 sm:mx-16 sm:my-16  pb-10 bg-black-light text-white font-roboto rounded-xl">
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
  );
};

export default Ship;
