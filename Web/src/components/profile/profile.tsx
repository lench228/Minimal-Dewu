// @flow
import * as React from "react";

import FormContainer from "./profile-form";
import ProfileUserForm from "./profile-user-form";
import ProfileShipForm from "./profile-ship-form";
import Loading from "../../assets/icons/loading";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../popups/auth/model/auth.slice";

export const Profile = () => {
  const [disabledShip, setDisabledShip] = React.useState(true);
  const [disabledUser, setDisabledUser] = React.useState(true);

  const isLoading = useSelector(selectIsLoading);
  return (
    <div
      className={
        "font-main overflow-y-scroll text-white-darker-1 flex items-center justify-center m-4 sm:m-auto"
      }
    >
      <section className={"flex gap-6 flex-col items-center"}>
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
    </div>
  );
};
