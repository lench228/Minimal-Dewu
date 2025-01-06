// @flow
import * as React from "react";

import FormContainer from "./profile-form";
import ProfileUserForm from "./profile-user-form";
import ProfileShipForm from "./profile-ship-form";

export const Profile = () => {
  const [disabledShip, setDisabledShip] = React.useState(true);
  const [disabledUser, setDisabledUser] = React.useState(true);

  return (
    <div
      className={
        "font-anonymous overflow-y-scroll text-white-darker-1 m-2  h-5/6 flex items-center justify-center sm:m-auto"
      }
    >
      <section className={"flex gap-6 flex-col "}>
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
    </div>
  );
};
