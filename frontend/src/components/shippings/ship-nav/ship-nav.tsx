import React from "react";
import ShipNavPart from "./ship-nav-part";

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
    <div
      className={
        " sm:m-10 mt-auto mb-10 flex flex-col sm:flex-row items-end sm:items-start sm:justify-center gap-6 sm:gap-0 sm:px-20 p-5 sm:py-16 w-full sm:text-2xl text-sm"
      }
    >
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
