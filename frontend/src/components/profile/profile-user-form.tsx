import React, { useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import {
  findErrors,
  resetErrors,
  selectErrors,
} from "../order/order-errors.slice";

import { selectUser } from "../layout/auth.slice";
import { Button } from "../ui/button";

interface Props {
  disabledEdit: boolean;
}

const ProfileUserForm: React.FC<Props> = ({ disabledEdit }) => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [name, setName] = React.useState(user?.fullName || "");
  const [phone, setPhone] = React.useState(user?.phone || "");
  const [email, setEmail] = React.useState(user?.email || "");

  useEffect(() => {
    setName(user?.fullName || "");
    setPhone(user?.phone || "");
    setEmail(user?.email || "");

    dispatch(resetErrors());
  }, [disabledEdit]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = e.target.checkValidity();
    const validationMessage = e.target.validationMessage;

    if (!disabledEdit) {
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "name":
          setName(value);
          break;
      }
    }

    dispatch(
      findErrors({
        name,
        isValid,
        validationMessage,
      }),
    );
  };

  const checkValidity = () =>
    !!Object.keys(errors).map((error) =>
      error === "email" || "name" || "phone" ? errors.error : "",
    ).length;

  return (
    <form className="w-2/3 flex flex-col items-center">
      <Input
        error={errors.name}
        name="name"
        label="ФИО"
        placeholder="Пример Примеров"
        onChange={onChange}
        required
        value={name}
        disabled={disabledEdit}
      />
      <Input
        error={errors.phone}
        name="phone"
        label="Телефон"
        placeholder="+7(999) 252 25-25"
        type="tel"
        onChange={onChange}
        required
        value={phone}
        disabled={disabledEdit}
      />
      <Input
        error={errors.email}
        name="email"
        label="Почта"
        placeholder="primer@mail.com"
        type="email"
        onChange={onChange}
        required
        value={email}
        disabled={disabledEdit}
      />
      {!disabledEdit && (
        <Button disabled={checkValidity()}>Сохранить изменения</Button>
      )}
    </form>
  );
};

export default ProfileUserForm;
