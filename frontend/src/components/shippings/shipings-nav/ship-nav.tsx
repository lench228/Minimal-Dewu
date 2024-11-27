import React from "react";
import ShipNavPart from "./ship-nav-part";
import { TypesTexts } from "../ship";
import {
  selectCanceled,
  selectCurrent,
  selectEnded,
  ShippingTypes,
} from "../ship.slice";
import { useSelector } from "react-redux";

interface iShipNav {}

const ShipNav: React.FC<iShipNav> = () => {
  return (
    <div className={"flex justify-between px-20 py-16 w-full text-2xl "}>
      <ShipNavPart
        type={"current"}
        count={useSelector(selectCurrent).length}
      ></ShipNavPart>
      <ShipNavPart
        type={"ended"}
        count={useSelector(selectEnded).length}
      ></ShipNavPart>
      <ShipNavPart
        type={"canceled"}
        count={useSelector(selectCanceled).length}
      ></ShipNavPart>
    </div>
  );
};

export default ShipNav;
