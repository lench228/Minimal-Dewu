// @flow
import * as React from "react";

import Input from "../../ui/input/input";
import { Email } from "../../../assets/icons/email";
import { ShowPas } from "../../../assets/icons/show-pas";
import { Pas } from "../../../assets/icons/pas";
import { Button } from "../../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUserThunk, registerUserThunk } from "./model/authActions";
import { AppDispatch } from "../../../services/store";
import { selectIsLoading } from "./model/auth.slice";
import Loading from "../../../assets/icons/loading";

export const AuthForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isHidePas, setHidePas] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const nav = useNavigate();

  const loading = useSelector(selectIsLoading);

  function handleClick() {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      "open",
      searchParams.get("open") === "login" ? "register" : "login",
    );
    setSearchParams(newParams);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (searchParams.get("open") === "login") {
        dispatch(loginUserThunk({ email, password }));
      } else {
        dispatch(registerUserThunk({ email, password }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`font-main rounded-xl p-10 flex  gap-20 flex-col sm:w-full sm:h-5/6 justify-center items-center bg-black-light border-2 border-black-light-2`}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <h1 className={`text-3xl text-white-darker-1 font-title`}>
        {searchParams.get("open") === "login"
          ? "Добро пожаловать"
          : "Регистрация"}
      </h1>
      <div className={"flex flex-col gap-4"}>
        <Input
          startIcon={<Email />}
          placeholder={"primer@mail.com"}
          width={600}
          value={email}
          error={""}
          onChange={(e) => setEmail(e.target.value)}
          name={"Email"}
        />
        <Input
          startIcon={<Pas />}
          endIcon={<ShowPas active={isHidePas} setActive={setHidePas} />}
          error={""}
          width={600}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isHidePas ? "password" : "text"}
          placeholder={"Введите надежный пароль"}
          name={"password"}
        />
      </div>
      <div className={"flex flex-col gap-4 w-5/6 items-center"}>
        {loading ? (
          <Loading></Loading>
        ) : (
          <Button type="submit">отправить</Button>
        )}

        <p
          onClick={() => {
            handleClick();
          }}
          className={"text-white-darker-1 underline hover:text-white-darker-2"}
        >
          {searchParams.get("open") === "login"
            ? "У меня нет аккаунта"
            : "У меня уже есть аккаунт"}
        </p>
      </div>
    </form>
  );
};
