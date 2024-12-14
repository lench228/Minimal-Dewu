import { useDispatch, useSelector } from "react-redux";
import {
  addUrlAndValidate,
  selectError,
  selectIsLoading,
  selectUrl,
  setActivePopup,
  setGood,
  setLoading,
} from "./home-slice";
import Link from "../../assets/icons/link";
import Input from "../ui/input/input";
import AddGood from "../popups/good-popup/add-good";
import { getGood } from "../../lib/actions/getGood";
import React, { FormEvent, useState } from "react";
import Loading from "../../assets/icons/loading";
import { iGood } from "../../lib/definitions";
import { Popup } from "../popups/popup";
import { GoodPopup } from "../popups/good-popup/good-popup";
import clsx from "clsx";

interface iHomePage {
  formWidth?: string;
}

const HomePage: React.FC<iHomePage> = ({
  formWidth = window.screen.width <= 680 ? "w-[90%]" : "w-2/3",
}) => {
  const dispatch = useDispatch();
  const url = useSelector(selectUrl);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const handleInput = (link: string) => {
    dispatch(addUrlAndValidate(link));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setTimeout(() => {
      getGood(url)
        .then((res) => {
          dispatch(setGood(res));
          dispatch(setActivePopup("good"));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }, 1000);
  };

  return (
    <form
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
        handleLinkAdd={() => getGood(url)}
        name="linkAdd"
      />
    </form>
  );
};

export default HomePage;
