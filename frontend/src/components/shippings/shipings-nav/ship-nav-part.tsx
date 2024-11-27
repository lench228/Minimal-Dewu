import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectActive, setActive, ShippingTypes } from "../ship.slice";
import { TypesTexts } from "../ship";
import { useSearchParams } from "react-router-dom";

interface iShipNavPart {
  type: ShippingTypes;
  count: number;
}

const ShipNavPart: React.FC<iShipNavPart> = ({ ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selected = useSelector(selectActive);
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSearchParams({ active: props.type });
    dispatch(setActive(props.type));
  };

  return (
    <a
      className={clsx(
        "flex gap-1",
        props.type !== selected ? "text-black-light-2" : "",
      )}
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
    </a>
  );
};

export default ShipNavPart;
