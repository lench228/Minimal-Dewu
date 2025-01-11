// @flow
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const Popup: React.FC<{
  children: React.ReactNode;
  isReset?: boolean;
}> = ({ ...props }) => {
  const nav = useNavigate();

  const handleClickOutside = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      if (props.isReset) {
        nav("/");
      } else {
        nav(-1);
      }
    }
  };
  return (
    <section
      id={"popup-content"}
      onClick={(e) => {
        handleClickOutside(e);
      }}
      className={`bg-black-light bg-opacity-90 w-full
         h-full fixed  flex
         top-0 left-0`}
    >
      {props.children}
    </section>
  );
};
