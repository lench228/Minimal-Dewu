import React, { useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import {
  findErrors,
  resetErrors,
  selectErrors,
} from "../order/order-errors.slice";

import { Button } from "../ui/button";
import { selectUser } from "../popups/auth/model/auth.slice";
import { updateUserData } from "../../lib/api/api";
import { AppDispatch } from "../../services/store";
import {
  getUserDataThunk,
  updateUserDataThunk,
} from "../popups/auth/model/authActions";

interface Props {
  disabledEdit: boolean;
}

const ProfileUserForm: React.FC<Props> = ({ disabledEdit }) => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  const [name, setName] = React.useState(user?.userInfo.fullName || "");
  const [phone, setPhone] = React.useState(user?.userInfo.phone || "");
  const [email, setEmail] = React.useState(user?.userInfo.email || "");

  useEffect(() => {
    setName(user?.userInfo.fullName || "");
    setPhone(user?.userInfo.phone || "");
    setEmail(user?.userInfo.email || "");

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
  const handleFormSubmit = () => {
    dispatch(
      updateUserDataThunk({
        personalData: {
          phone: phone,
          fullName: name,
          email: email,
        },
      }),
    );
    dispatch(getUserDataThunk());
  };

  const checkValidity = () =>
    !!Object.keys(errors).map((error) =>
      error === "email" || "name" || "phone" ? errors.error : "",
    ).length;

  return (
    <section className="w-2/3 flex flex-col items-center">
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
        <Button
          type={"submit"}
          onClick={() => handleFormSubmit()}
          disabled={checkValidity()}
        >
          Сохранить изменения
        </Button>
      )}
    </section>
  );
};

export default ProfileUserForm;
