// @flow
import * as React from "react";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      className={clsx(
        `w-2/3 text-xl  text-white-darker-1 rounded-xl flex font-bold p-2 border-2 border-black-light-2  font-roboto  justify-center items-center`,
        props.disabled ? "opacity-50" : "hover:bg-black-light-2",
      )}
    >
      {props.children}
    </button>
  );
};
