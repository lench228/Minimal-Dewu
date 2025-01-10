import { useDispatch, useSelector } from "react-redux";

import Link from "../../assets/icons/link";
import Input from "../ui/input/input";
import AddGood from "../popups/good-popup/add-good";

import React, { FormEvent, useRef } from "react";
import Loading from "../../assets/icons/loading";
import clsx from "clsx";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addUrlAndValidate,
  selectError,
  selectGood,
  selectIsLoading,
  selectUrl,
} from "./model/home-slice";
import { AppDispatch } from "../../services/store";
import { getGoodThunk } from "./model/actions";
import * as trace_events from "node:trace_events";

interface iHomePage {
  formWidth?: string;
}

const HomePage: React.FC<iHomePage> = ({
  formWidth = window.screen.width <= 680 ? "w-[90%]" : "w-2/3",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const url = useSelector(selectUrl);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const good = useSelector(selectGood);
  const formRef = useRef<HTMLFormElement>(null);
  const nav = useNavigate();

  const handleInput = (link: string) => {
    dispatch(addUrlAndValidate(link));
  };
  const location = useLocation();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(getGoodThunk(url));
    nav(`/goods/${good?.id}`, { state: { background: location } });
  };

  const handleInsertClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    if (text && formRef.current) {
      dispatch(addUrlAndValidate(text));
    }
  };

  const clipBoard = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-clipboard"
      viewBox="0 0 16 16"
    >
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>
  );

  return (
    <form
      ref={formRef}
      className={clsx(
        "flex flex-col items-center h-20 justify-center sm:h-full m-auto ",
        formWidth,
      )}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <Input
        startIcon={!isLoading ? <Link /> : <Loading />}
        placeholder="вставьте ссылку сюда"
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={url}
        endIcon={!error && url ? <AddGood /> : null}
        error={error}
        name="linkAdd"
        isFixed
      />
      <Button
        className={"w-auto gap-2 !text-sm self-end mt-1"}
        type={"button"}
        onClick={(e) => handleInsertClick(e)}
      >
        {clipBoard} вставить
      </Button>
    </form>
  );
};

export default HomePage;
