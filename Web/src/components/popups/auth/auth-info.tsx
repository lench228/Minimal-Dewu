// @flow
import * as React from "react";
import { Hamburger } from "../../../assets/icons/hamburger";

interface iAuthInfoItem {
  text: string;
  children: React.ReactNode;
}

const AuthInfoItem = ({ ...props }: iAuthInfoItem) => {
  return (
    <div
      className={`flex flex-col bg-black-light p-3 rounded-xl border-2 border-black-light-2 max-w-80 text-2xl gap-4 font-main`}
    >
      {props.children}
      <p>{props.text}</p>
    </div>
  );
};

const items = [
  {
    text: "Lorem ipsum aslsaos sdjmvkmxcv odskofkdmvmkmv !!!!",
  },
  {
    text: "Lorem ipsum aslsaos  odskofkdmvmkmv !!!!",
  },
  {
    text: "Lorem ipsum aslsaos sdjmvkmxcv  !!!!",
  },
];

export const AuthInfo = () => {
  return (
    <div className={`text-white-darker-1 w-full h-1/2`}>
      <h1 className={`font-title text-2xl mb-5`}>Плюшки регистрации</h1>
      <ul className={`flex flex-col  gap-4`}>
        {items.map((item) => {
          return (
            <li key={item.text}>
              <AuthInfoItem {...item}>
                <Hamburger />
              </AuthInfoItem>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
