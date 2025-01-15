// @flow
import * as React from "react";

import FormContainer from "./profile-form";
import ProfileUserForm from "./profile-user-form";
import ProfileShipForm from "./profile-ship-form";
import Loading from "../../assets/icons/loading";
import { useSelector } from "react-redux";
import { selectIsLoading, selectUser } from "../popups/auth/model/auth.slice";
import { Button } from "../ui/button";

export const Profile = () => {
  const [disabledShip, setDisabledShip] = React.useState(true);
  const [disabledUser, setDisabledUser] = React.useState(true);
  const userName = useSelector(selectUser)?.userInfo.fullName;

  const isLoading = useSelector(selectIsLoading);
  return (
    <div
      lang="notranslate"
      className={
        "overflow-y-scroll mt-10 mb-12 sm:mb-0 font-main  text-white-darker-1 flex sm:flex-row flex-col sm:items-center sm:justify-center  m-auto"
      }
    >
      {!isLoading ? (
        <>
          <section
            className={
              "sm:h-full p-4 max-h-[200px] flex flex-col gap-2  border-black-light-2 self-start  sm:m-2 sm:w-2/6 border-[1px] rounded-xl bg-black-light"
            }
          >
            <div className={"flex border-b-[1px] justify-between "}>
              <h1 className={"flex flex-col font-bold text-3xl pb-2 "}>
                {userName ? (
                  <>
                    {" "}
                    Привет, <br />
                    <span className={"pl-4"}>{userName}</span>
                  </>
                ) : (
                  <p>Давайте знакомиться</p>
                )}
              </h1>
              <Button
                className={"h-1/2 w-1/4"}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                type={"button"}
              >
                Выйти
              </Button>
            </div>
            <p className={"opacity-20 text-2xl"}>
              Тут будет больше возможностей
            </p>
          </section>
          <section
            className={"flex gap-6 h-1/3 flex-col items-center sm:h-full p-2"}
          >
            <FormContainer
              title={"Личные данные"}
              description={"Имя, телефон, почта"}
              onEditClick={() => setDisabledUser(!disabledUser)}
            >
              {" "}
              {isLoading ? (
                <Loading />
              ) : (
                <ProfileUserForm disabledEdit={disabledUser}></ProfileUserForm>
              )}
            </FormContainer>
            <FormContainer
              title={"Данные доставки"}
              description={"Адрес"}
              onEditClick={() => setDisabledShip(!disabledShip)}
            >
              {" "}
              {isLoading ? (
                <Loading />
              ) : (
                <ProfileShipForm disabledEdit={disabledShip}></ProfileShipForm>
              )}
            </FormContainer>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
