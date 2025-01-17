import React, { useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import {
  findErrors,
  resetErrors,
  selectErrors,
} from "../order/order-errors.slice";

import Error from "../ui/input/error";
import { Button } from "../ui/button";
import { selectUser } from "../popups/auth/model/auth.slice";
import {
  getUserDataThunk,
  updateUserDataThunk,
} from "../popups/auth/model/authActions";
import { AppDispatch } from "../../services/store";
interface Props {
  disabledEdit: boolean;
}

const ProfileShipForm = ({ disabledEdit }: Props) => {
  const address = useSelector(selectUser)?.address;
  const errors = useSelector(selectErrors);

  const dispatch = useDispatch<AppDispatch>();

  const [city, setCity] = React.useState(address?.city || "");
  const [street, setStreet] = React.useState(address?.street || "");
  const [flat, setFlat] = React.useState(address?.apartment || "");
  const [house, setHouse] = React.useState(address?.building || "");

  useEffect(() => {
    setCity(address?.city || "");
    setStreet(address?.street || "");
    setFlat(address?.apartment || "0");
    setHouse(address?.building || "0");

    dispatch(resetErrors());
  }, [disabledEdit, address]);

  const checkValidity = () =>
    !!Object.keys(errors).map((error) =>
      error === "city" || "house" || "flat" || "street" ? errors.error : "",
    ).length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = e.target.checkValidity();
    const validationMessage = e.target.validationMessage;

    if (!disabledEdit) {
      switch (name) {
        case "city":
          setCity(value);
          break;
        case "house":
          setHouse(value);
          break;
        case "flat":
          setFlat(value);
          break;
        case "street":
          setStreet(value);
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
        addressData: {
          city: city,
          street: street,
          apartment: flat,
          building: house,
        },
      }),
    ).then(() => dispatch(getUserDataThunk()));
  };

  return (
    <>
      {address ? (
        <section className={"w-2/3 flex flex-col items-center"}>
          <Input
            error={errors["city"]}
            name="city"
            label="Город"
            placeholder="Екатеринбург"
            type="text"
            onChange={onChange}
            value={city}
            required
            disabled={disabledEdit}
          />
          <Input
            error={errors["street"]}
            name="street"
            label="Улица"
            placeholder="Вайнера"
            type="text"
            onChange={onChange}
            value={street}
            required
            disabled={disabledEdit}
          />
          <div className="flex flex-row items-center justify-between gap-10 w-full">
            <Input
              error={errors["house"]}
              name="house"
              label="Дом"
              placeholder="1"
              type="number"
              width="w-full"
              onChange={onChange}
              value={house}
              required
              disabled={disabledEdit}
            />
            <Input
              error={errors["flat"]}
              name="flat"
              label="Квартира"
              placeholder="1"
              type="number"
              width="100%"
              value={flat}
              onChange={onChange}
              required
              disabled={disabledEdit}
            />
          </div>
          {!disabledEdit && (
            <Button
              type={"submit"}
              disabled={checkValidity()}
              onClick={() => handleFormSubmit()}
            >
              Сохранить изменения
            </Button>
          )}
        </section>
      ) : (
        <Error text={"Ошибка"} />
      )}
    </>
  );
};

export default ProfileShipForm;
