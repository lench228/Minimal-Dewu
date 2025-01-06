import React from "react";
import { iShipping } from "../../lib/definitions";
import dayjs from "dayjs";
import Angle from "../../assets/icons/angle";

import ShipGood from "./ship-good";
import ShipFooter from "./ship-footer";

export type iShipItem = iShipping;

const ShipItem: React.FC<iShipItem> = ({ ...props }) => {
  const handleArrowClick = () => {
    setOpen(!isOpen);
  };

  const [isOpen, setOpen] = React.useState(false);

  return (
    <li
      className={
        "border-[1px]  border-black-light-2 rounded-xl w-full px-4 sm:px-12 py-8 font-main"
      }
    >
      <header className={"text-2xl flex justify-between"}>
        <div>
          <h2>
            Заказ №{props.id} от <br />
          </h2>
          <p>{dayjs(props.due).format("DD.MM.YY")}</p>
        </div>
        <span>{props.total}</span>
        <Angle onClick={() => handleArrowClick()} isOpen={isOpen}></Angle>
      </header>
      {isOpen && (
        <div className={""}>
          <ul className={"border-white-darker-2 border-b-[1px] py-10"}>
            {props.goods &&
              props.goods.map((item) => {
                return (
                  <ShipGood
                    key={item.good.id + "order"}
                    good={item.good}
                    count={item.count}
                  />
                );
              })}
          </ul>
          <ShipFooter
            userData={props.userData}
            total={props.total}
            address={props.address}
          ></ShipFooter>
        </div>
      )}
    </li>
  );
};

export default ShipItem;
