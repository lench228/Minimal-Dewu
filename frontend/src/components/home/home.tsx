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
import { findGood } from "../../lib/actions/findGood";
import React, { FormEvent, useState } from "react";
import Loading from "../../assets/icons/loading";
import { iGood } from "../../lib/definitions";
import { Popup } from "../popups/popup";
import { GoodPopup } from "../popups/good-popup/good-popup";

interface iHomePage {
  inputWidth?: string;
}

const HomePage: React.FC<iHomePage> = ({ inputWidth = "760px" }) => {
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
      findGood(url)
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
      className="flex flex-col items-center justify-center h-full"
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <Input
        startIcon={!isLoading ? <Link /> : <Loading />}
        placeholder="вставьте ссылку сюда"
        width={inputWidth}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={url}
        endIcon={!error && url ? <AddGood /> : null}
        error={error}
        handleLinkAdd={() => findGood(url)}
        name="linkAdd"
      />
    </form>
  );
};

export default HomePage;
