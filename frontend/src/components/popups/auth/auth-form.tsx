// @flow
import * as React from "react";
import { Switch } from "../../ui/switch";
import Input from "../../ui/input/input";
import { Email } from "../../../assets/icons/email";
import { ShowPas } from "../../../assets/icons/show-pas";
import { Pas } from "../../../assets/icons/pas";
import { Button } from "../../ui/button";
import { NavLink, useSearchParams } from "react-router-dom";

type Props = {};
export const AuthForm = (props: any) => {
  const [email, setEmail] = React.useState("");
  const [isHidePas, setHidePas] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      "open",
      searchParams.get("open") === "login" ? "register" : "login",
    );
    console.log(newParams.get("open"));
    setSearchParams(newParams);
  }

  return (
    <form
      className={`rounded-xl p-10 flex gap-20 flex-col w-1/2 justify-center items-center bg-black-light border-2 border-black-light-2`}
    >
      <h1 className={`text-3xl text-white-darker-1 font-anonymous`}>
        Добро пожаловать
      </h1>
      {/*<Switch>  ???  </Switch>*/}
      <div className={"flex flex-col gap-4"}>
        <Input
          startIcon={<Email />}
          placeholder={"primer@mail.com"}
          width={600}
          value={email}
          error={""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          startIcon={<Pas />}
          endIcon={<ShowPas active={isHidePas} setActive={setHidePas} />}
          error={""}
          width={600}
          type={isHidePas ? "password" : "text"}
          placeholder={"Введите надежный пароль"}
        />
      </div>
      <div className={"flex flex-col gap-4 w-5/6 items-center"}>
        <Button>
          {searchParams.get("open") === "login" ? "Войти" : "Регистрация"}
        </Button>
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
