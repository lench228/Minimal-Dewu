import React from "react";

interface iShipNavPart {
  text: string;
  count: number;
}

const ShipNavPart: React.FC<iShipNavPart> = ({ ...props }) => {
  return (
    <a className={"flex gap-1"}>
      {props.text}
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
