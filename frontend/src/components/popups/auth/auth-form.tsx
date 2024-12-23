// @flow
import * as React from "react";
import { Switch } from "../../ui/switch";
import Input from "../../ui/input/input";
import { Email } from "../../../assets/icons/email";
import { ShowPas } from "../../../assets/icons/show-pas";
import { Pas } from "../../../assets/icons/pas";
import { Button } from "../../ui/button";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress, setAuth, setUser } from "../../layout/auth.slice";
import { setActivePopup } from "../../home/home-slice";
import { authUser } from "../../../lib/actions/auth";
import { addressFetch } from "../../../lib/actions/getAddress";

type Props = {};
export const AuthForm = (props: any) => {
  const [email, setEmail] = React.useState("");
  const [isHidePas, setHidePas] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const nav = useNavigate();

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
      dispatch(setAuth(true));
      dispatch(setActivePopup(""));
      const user = await authUser("");
      dispatch(setUser(user));
      const address = await addressFetch("");
      dispatch(setAddress(address));
      nav("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`rounded-xl p-10 flex  gap-20 flex-col sm:w-full sm:h-5/6 justify-center items-center bg-black-light border-2 border-black-light-2`}
      onSubmit={(e) => handleFormSubmit(e)}
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
          name={"Email"}
        />
        <Input
          startIcon={<Pas />}
          endIcon={<ShowPas active={isHidePas} setActive={setHidePas} />}
          error={""}
          width={600}
          type={isHidePas ? "password" : "text"}
          placeholder={"Введите надежный пароль"}
          name={"Email"}
        />
      </div>
      <div className={"flex flex-col gap-4 w-5/6 items-center"}>
        <Button type="submit">
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
