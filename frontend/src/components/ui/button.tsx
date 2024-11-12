// @flow
import * as React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-2/3 text-xl hover:bg-black-light-2 text-white-darker-1 rounded-xl flex font-bold p-6 border-2 border-black-light-2  font-roboto  justify-center items-center`}
    >
      {props.children}
    </button>
  );
};
