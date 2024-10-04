// @flow
import * as React from "react";

type Props = {};
export const Button = (props: any) => {
  return (
    <button
      className={`w-2/3 hover:bg-black-light-2 text-white-darker-1 rounded-xl flex font-bold p-6 border-2 border-black-light-2  font-roboto  justify-center items-center`}
    >
      {props.children}
    </button>
  );
};
