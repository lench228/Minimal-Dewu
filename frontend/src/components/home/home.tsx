import { useDispatch, useSelector } from "react-redux";
import {
  addUrlAndValidate,
  selectError,
  selectIsLoading,
  selectUrl,
  setLoading,
} from "./home-slice";
import Link from "../../assets/icons/link";
import Input from "../ui/input/input";
import AddLink from "../good-popup/add-link";
import { findGood } from "../../lib/actions/findGood";
import { FormEvent, useState } from "react";
import Loading from "../../assets/icons/loading";
import { iGood } from "../../lib/definitions";

const HomePage = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectUrl);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [good, setGood] = useState<iGood>();

  const openPopup = (res: iGood) => {
    setIsPopupOpen(true);
    setGood(res);
  };
  const handleInput = (link: string) => {
    dispatch(addUrlAndValidate(link));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setTimeout(() => {
      findGood(url)
        .then((res) => {
          openPopup(res);
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
        width={"760px"}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={url}
        endIcon={!error && url ? <AddLink /> : null}
        error={error}
        handleLinkAdd={() => findGood(url)}
      />
      {isPopupOpen && good && (
        <div
          className={
            "bg-black-light bg-opacity-70 w-full   " +
            "   h-full fixed  " +
            " top-0 left-0 flex gap-5 items-center justify-center"
          }
        >
          <p>{good.name}</p>
        </div>
      )}
    </form>
  );
};

export default HomePage;
