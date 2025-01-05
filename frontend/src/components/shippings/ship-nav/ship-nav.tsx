import React from "react";
import ShipNavPart from "./ship-nav-part";

import { selectCanceled, selectCurrent, selectEnded } from "../ship.slice";
import { useSelector } from "react-redux";

interface iShipNav {}

const ShipNav: React.FC<iShipNav> = () => {
  return (
    <div
      className={
        " sm:m-0 mt-auto mb-10 flex flex-col sm:flex-row items-end sm:items-start sm:justify-center gap-2 sm:gap-12 sm:px-10 p-5 sm:py-16 w-full sm:text-2xl text-sm"
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
