// @flow
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActivePopup } from "../home/home-slice";

type Props = {};
export const Popup: React.FC<{
  children: React.ReactNode;
}> = ({ ...props }) => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleClickOutside = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      nav(-1);
    }
  };
  return (
    <section
      id={"popup-content"}
      onClick={(e) => {
        handleClickOutside(e);
      }}
      className={`bg-black-light bg-opacity-70 w-full
         h-full fixed  flex
         top-0 left-0`}
    >
      {props.children}
    </section>
  );
};
