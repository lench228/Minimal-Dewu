// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../layout/auth.slice";
import FormContainer from "./profile-form";
import ProfileUserForm from "./profile-user-form";
import ProfileShipForm from "./profile-ship-form";

type Props = {};
export const Profile = (props: any) => {
  const [disabledShip, setDisabledShip] = React.useState(true);
  const [disabledUser, setDisabledUser] = React.useState(true);

  const user = useSelector(selectUser);

  return (
    <div
      className={
        "font-anonymous  text-white-darker-1 m-10 h-full flex items-center justify-center"
      }
    >
      <section
        className={
          "flex flex-col gap-2 border-black-light-2  h-5/6 p-2 m-2 w-2/6 border-[1px] rounded-xl bg-black-light"
        }
      >
        <h1 className={" font-bold text-3xl pb-2 border-b-[1px]"}>
          Привет, <br />
          <span>{user?.fullName}</span>
        </h1>
        <p className={"opacity-20 text-2xl"}>Тут будет больше возможностей</p>
      </section>
      {user && (
        <section>
          <FormContainer
            title={"Личные данные"}
            description={"Имя, телефон, почта"}
            onEditClick={() => setDisabledUser(!disabledUser)}
          >
            <ProfileUserForm disabledEdit={disabledUser}></ProfileUserForm>
          </FormContainer>
          <FormContainer
            title={"Данные доставки"}
            description={"Адрес"}
            onEditClick={() => setDisabledShip(!disabledShip)}
          >
            <ProfileShipForm disabledEdit={disabledShip} />
          </FormContainer>
        </section>
      )}
    </div>
  );
};
