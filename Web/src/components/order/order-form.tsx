import React, { forwardRef, useEffect, useState } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { findErrors, selectErrors } from "./order-errors.slice";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../services/store";
import { postOrderThunk } from "../shippings/model/actions";
import { clearStore, removeAllGood, selectGoods } from "../cart/cart-slice";
import { selectUser } from "../popups/auth/model/auth.slice";

const OrderForm = forwardRef<HTMLFormElement>(({}, ref) => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  console.log(user?.userInfo);

  const [userData, setUserData] = useState({
    phone: "",
    fullName: "",
  });

  const [address, setAddress] = useState({
    city: "",
    street: "",
    building: "",
    apartment: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (user?.userInfo) {
      setUserData({
        phone: user.userInfo.phone || "",
        fullName: user.userInfo.fullName || "",
      });
    }
    if (user?.address) {
      setAddress({
        city: user.address.city || "",
        street: user.address.street || "",
        building: user.address.building || "",
        apartment: user.address.apartment || "",
      });
    }
  }, [user]);

  const validateFields = () => {
    if (ref && "current" in ref && ref.current) {
      const formElements = ref.current.elements;

      const inputs = Array.from(formElements) as HTMLInputElement[];

      inputs.forEach((input) => {
        dispatch(
          findErrors({
            name: input.name,
            isValid: input.checkValidity(),
            validationMessage: input.validationMessage,
          }),
        );
      });
    }
    return errors;
  };

  const location = useLocation();
  const goods = useSelector(selectGoods);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      dispatch(postOrderThunk({ goods, userData, address }));
      dispatch(clearStore());
      nav(`/orderSuccess`, { state: { background: "/" } });
    } else {
      console.log("Есть ошибки:", errors);
    }
  };

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

  useEffect(() => {}, [errors]);

  return (
    <form
      noValidate
      ref={ref}
      onSubmit={onSubmit}
      className="p-5 mb-6 font-main text-white-darker-1 bg-black-light-2  bg-opacity-40 border-1 border-black-light-2 w-[90%] sm:w-2/3 sm:p-14 sm:py-10 rounded-xl flex items-center flex-col gap-2 sm:gap-6"
    >
      <h2 className="text-3xl font-title font-bold text-center">Заказ</h2>
      <fieldset className="flex flex-col gap-3 w-full">
        <h3 className="text-2xl font-bold mb-3">Личные данные</h3>
        <Input
          error={errors.name}
          name="name"
          label="ФИО"
          placeholder="Пример Примеров"
          onChange={(e) => {
            onChange(e);
            setUserData({ ...userData, fullName: e.target.value });
          }}
          required
          value={userData.fullName}
        />
        <Input
          error={errors.phone}
          name="phone"
          label="Телефон"
          placeholder="+7(999) 252 25-25"
          type="tel"
          onChange={(e) => {
            onChange(e);
            setUserData({ ...userData, phone: e.target.value });
          }}
          required
          value={userData.phone}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-3 w-full">
        <h3 className="text-2xl font-bold mb-3">Доставка</h3>
        <Input
          error={errors.city}
          name="city"
          label="Город"
          placeholder="Екатеринбург"
          type="text"
          onChange={(e) => {
            onChange(e);
            setAddress({ ...address, city: e.target.value });
          }}
          required
          value={address.city}
        />
        <Input
          error={errors.street}
          name="street"
          label="Улица"
          placeholder="Вайнера"
          type="text"
          onChange={(e) => {
            onChange(e);
            setAddress({ ...address, street: e.target.value });
          }}
          required
          value={address.street}
        />
        <div className="flex flex-row items-center justify-between gap-1 w-full">
          <Input
            error={errors.house}
            name="house"
            label="Дом"
            placeholder="1"
            type="number"
            width="w-full"
            onChange={(e) => {
              onChange(e);
              setAddress({ ...address, building: e.target.value });
            }}
            required
            value={address.building}
          />
          <Input
            error={errors.flat}
            name="flat"
            label="Квартира"
            placeholder="1"
            type="number"
            width="100%"
            onChange={(e) => {
              onChange(e);
              setAddress({ ...address, apartment: e.target.value });
            }}
            required
            value={address.apartment}
          />
        </div>
      </fieldset>

      <Button
        type="submit"
        className={clsx(window.screen.width <= 680 ? "" : "hidden")}
        disabled={!!Object.values(errors).length}
      >
        Оформить заказ
      </Button>
    </form>
  );
});

OrderForm.displayName = "OrderForm";

export default OrderForm;
