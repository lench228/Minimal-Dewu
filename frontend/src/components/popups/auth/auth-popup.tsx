// @flow
import * as React from "react";
import { AuthInfo } from "./auth-info";
import { AuthForm } from "./auth-form";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

export const AuthPopup: React.FC = () => {
  return (
    <section className={"flex justify-center w-2/3 m-auto gap-10"}>
      <AuthInfo></AuthInfo>
      <AuthForm></AuthForm>
    </section>
  );
};
