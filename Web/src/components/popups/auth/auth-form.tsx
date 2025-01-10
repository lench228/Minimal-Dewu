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
import { selectError, selectIsLoading } from "./model/auth.slice";
import Loading from "../../../assets/icons/loading";
import Error from "../../ui/input/error";

export const AuthForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isHidePas, setHidePas] = React.useState(true);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);

  // Валидация email
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  function handleClick() {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      "open",
      searchParams.get("open") === "login" ? "register" : "login",
    );
    setSearchParams(newParams);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters, contain one uppercase letter, one digit, and one special character.",
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    if (searchParams.get("open") === "login") {
      dispatch(loginUserThunk({ email, password }));
    } else {
      dispatch(registerUserThunk({ email, password }));
    }
    nav("/profile");
  };

  return (
    <form
      className="font-main rounded-xl p-2 sm:p-10 flex h-5/6 gap-20 flex-col w-full justify-center items-center bg-black-light border-2 border-black-light-2"
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-3xl text-white-darker-1 font-title">
        {searchParams.get("open") === "login"
          ? "Добро пожаловать"
          : "Регистрация"}
      </h1>
      <div className="flex flex-col gap-4">
        <Input
          startIcon={<Email />}
          placeholder="primer@mail.com"
          width={600}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="Email"
        />
        {emailError && <Error text={emailError} />}
        <Input
          startIcon={<Pas />}
          endIcon={<ShowPas active={isHidePas} setActive={setHidePas} />}
          error={passwordError}
          width={600}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isHidePas ? "password" : "text"}
          placeholder="Введите надежный пароль"
          name="password"
        />
        {error && !passwordError && !emailError && <Error text={error} />}
      </div>
      <div className="flex flex-col gap-4 w-5/6 items-center">
        {loading ? (
          <Loading />
        ) : (
          <Button type="submit" disabled={!email || !password}>
            отправить
          </Button>
        )}

        <p
          onClick={() => {
            handleClick();
          }}
          className="text-white-darker-1 underline hover:text-white-darker-2"
        >
          {searchParams.get("open") === "login"
            ? "У меня нет аккаунта"
            : "У меня уже есть аккаунт"}
        </p>
      </div>
    </form>
  );
};
