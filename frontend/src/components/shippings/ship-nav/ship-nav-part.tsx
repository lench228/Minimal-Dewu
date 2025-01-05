import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setActive, ShippingTypes } from "../ship.slice";
import { TypesTexts } from "../ship";
import { useSearchParams } from "react-router-dom";

interface iShipNavPart {
  type: ShippingTypes;
  count: number;
}

const ShipNavPart: React.FC<iShipNavPart> = ({ ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selected = searchParams.get("active") === props.type;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSearchParams({ active: props.type });
    dispatch(setActive(props.type));
  };

  return (
    <button
      className={clsx("flex gap-1", selected ? "text-black-light-2" : "")}
      onClick={(e) => handleLinkClick(e)}
    >
      {TypesTexts[props.type]}
      <div
        className={
          "bg-white-darker-2 text-black-light-2 rounded-[100%] w-8  text-center"
        }
      >
        {props.count}
      </div>
    </button>
  );
};

export default ShipNavPart;
