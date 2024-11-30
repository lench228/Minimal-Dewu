import React, { useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { findErrors, selectErrors } from "../order/order-errors.slice";
import { addressFetch } from "../../lib/actions/getAddress";
import { selectAddress } from "../layout/auth.slice";
import Error from "../ui/input/error";
interface Props {
  disabled: boolean;
}

const ProfileShipForm: React.FC<Props> = ({ ...props }) => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

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
    <>
      {address ? (
        <form className={"w-2/3"}>
          <Input
            error={""}
            name="city"
            label="Город"
            placeholder="Екатеринбург"
            type="text"
            onChange={onChange}
            value={address.city}
            required
            disabled={props.disabled}
          />
          <Input
            error={""}
            name="street"
            label="Улица"
            placeholder="Вайнера"
            type="text"
            onChange={onChange}
            value={address.street}
            required
            disabled={props.disabled}
          />
          <div className="flex flex-row items-center justify-between gap-10 w-full">
            <Input
              error={""}
              name="house"
              label="Дом"
              placeholder="1"
              type="number"
              width="w-full"
              onChange={onChange}
              value={address.house}
              required
              disabled={props.disabled}
            />
            <Input
              error={""}
              name="flat"
              label="Квартира"
              placeholder="1"
              type="number"
              width="100%"
              value={address.flat}
              onChange={onChange}
              required
              disabled={props.disabled}
            />
          </div>
        </form>
      ) : (
        <Error text={"Ошибка"} />
      )}
    </>
  );
};

export default ProfileShipForm;
