// @flow
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import search from "../../assets/icons/add-link";

type Props = {
  active: boolean;
  type: string;
};

const SwitchButton = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", props.type);
    setSearchParams(newSearchParams);
  };
  return (
    <button
      type={"button"}
      onClick={() => {
        handleClick();
      }}
    >
      {props.type === "email" ? "Почта" : "Телефон"}
    </button>
  );
};

export const Switch = (props: any) => {
  const [searchParams, setUseSearchParams] = useSearchParams();
  return (
    <div>
      <SwitchButton
        type={"email"}
        active={searchParams.get("type") === "email"}
      ></SwitchButton>
      <SwitchButton
        type={"phone"}
        active={searchParams.get("type") === "phone"}
      ></SwitchButton>
    </div>
  );
};
