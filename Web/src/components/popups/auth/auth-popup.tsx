// @flow
import * as React from "react";
import { AuthInfo } from "./auth-info";
import { AuthForm } from "./auth-form";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const AuthPopup: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      "open",
      searchParams.get("open") === "login" ? "register" : "login",
    );
    setSearchParams(newParams);
  }, []);
  return (
    <section
      className={
        "flex sm:justify-center flex-col  sm:w-3/5 m-auto gap-10  font-roboto"
      }
    >
      {window.screen.width >= 680 && <AuthInfo></AuthInfo>}
      <AuthForm></AuthForm>
    </section>
  );
};
