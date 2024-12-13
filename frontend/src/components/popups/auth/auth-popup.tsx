// @flow
import * as React from "react";
import { AuthInfo } from "./auth-info";
import { AuthForm } from "./auth-form";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

export const AuthPopup: React.FC = () => {
  return (
    <section
      className={
        "flex sm:justify-center flex-col sm:flex-row w-5/6  sm:h-5/6 m-auto gap-10 "
      }
    >
      {window.screen.width >= 680 && <AuthInfo></AuthInfo>}
      <AuthForm></AuthForm>
    </section>
  );
};
