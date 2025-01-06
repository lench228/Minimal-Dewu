import React, { useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import {
  findErrors,
  resetErrors,
  selectErrors,
} from "../order/order-errors.slice";
import { addressFetch } from "../../lib/actions/getAddress";
import { selectAddress } from "../layout/auth.slice";
import Error from "../ui/input/error";
import { Button } from "../ui/button";
interface Props {
  disabledEdit: boolean;
}

const ProfileShipForm = ({ disabledEdit }: Props) => {
  const address = useSelector(selectAddress);
  const errors = useSelector(selectErrors);

  const dispatch = useDispatch();

  const [city, setCity] = React.useState(address?.city || "");
  const [street, setStreet] = React.useState(address?.street || "");
  const [flat, setFlat] = React.useState(address?.flat || "");
  const [house, setHouse] = React.useState(address?.house || "");

  useEffect(() => {
    setCity(address?.city || "");
    setStreet(address?.street || "");
    setFlat(address?.flat || "");
    setHouse(address?.house || "");

    dispatch(resetErrors());
  }, [disabledEdit]);

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

  return (
    <>
      {address ? (
        <form className={"w-2/3 flex flex-col items-center"}>
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
            <Button disabled={checkValidity()}>Сохранить изменения</Button>
          )}
        </form>
      ) : (
        <Error text={"Ошибка"} />
      )}
    </>
  );
};

export default ProfileShipForm;
