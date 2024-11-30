import React, { useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { findErrors, selectErrors } from "../order/order-errors.slice";
import { addressFetch } from "../../lib/actions/getAddress";
import { selectUser } from "../layout/auth.slice";

interface Props {
  disabled: boolean;
}
const ProfileUserForm: React.FC<Props> = ({ ...props }) => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target as HTMLInputElement;
    return dispatch(
      findErrors({
        name: field.name,
        isValid: field.checkValidity(),
        validationMessage: field.validationMessage,
      }),
    );
  };

  return (
    <form className={"w-2/3"}>
      <Input
        error={errors.name}
        name="name"
        label="ФИО"
        placeholder="Пример Примеров"
        onChange={onChange}
        required
        value={user?.fullName}
        disabled={props.disabled}
      />
      <Input
        error={errors.phone}
        name="phone"
        label="Телефон"
        placeholder="+7(999) 252 25-25"
        type="tel"
        onChange={onChange}
        required
        value={user?.phone}
        disabled={props.disabled}
      />

      <Input
        error={errors.email}
        name="email"
        label="Почта"
        placeholder="primer@mail.com"
        type="email"
        onChange={onChange}
        required
        value={user?.email}
        disabled={props.disabled}
      />
    </form>
  );
};

export default ProfileUserForm;
