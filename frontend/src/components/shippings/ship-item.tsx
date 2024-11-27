import React from "react";
import { iGood, iShipping } from "../../lib/definitions";
import dayjs from "dayjs";
import Angle from "../../assets/icons/angle";
import Cart from "../cart/cart";
import ShipGood from "./ship-good";
interface iShipItem extends iShipping {}

const ShipItem: React.FC<iShipItem> = ({ ...props }) => {
  const handleArrowClick = () => {
    setOpen(!isOpen);
  };

  const [isOpen, setOpen] = React.useState(false);

  return (
    <li
      className={
        "border-[1px] border-black-light-2 rounded-xl w-full px-12 py-8"
      }
    >
      <header className={"text-2xl flex justify-between "}>
        <div>
          <h2>
            Заказ №{props.id} от <br />
          </h2>
          <p>{dayjs(props.due).format("DD.MM.YY")}</p>
        </div>
        <span>{props.total}</span>
        <Angle onClick={() => handleArrowClick()}></Angle>
      </header>
      {isOpen && (
        <ul>
          {props.goods &&
            props.goods.map((item) => {
              console.log(item);
              return (
                <ShipGood
                  key={item.good.id + "order"}
                  good={item.good}
                  count={item.count}
                />
              );
            })}
        </ul>
      )}
    </li>
  );
};

export default ShipItem;
