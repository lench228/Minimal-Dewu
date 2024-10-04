// @flow
import * as React from "react";
import { AuthInfo } from "./auth-info";
import { AuthForm } from "./auth-form";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type iMainForm = {};
export const AuthPopup: React.FC<{
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ ...props }) => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClickOutside = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      nav("/");
      props.setIsPopupOpen(false);
    }
  };

  return (
    <section
      id={"popup-content"}
      onClick={(e) => {
        handleClickOutside(e);
      }}
      className={`bg-black-light bg-opacity-70 w-full
         h-full fixed 
         top-0 left-0 flex gap-5 items-center justify-center`}
    >
      <AuthInfo></AuthInfo>
      <AuthForm></AuthForm>
    </section>
  );
};
