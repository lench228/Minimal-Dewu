import React, { forwardRef, useEffect } from "react";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { findErrors, selectErrors } from "./order-errors.slice";
import { Button } from "../ui/button";
import clsx from "clsx";

const OrderForm = forwardRef<HTMLFormElement>(({}, ref) => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();

  //@todo Вынести в слайс

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Форма успешно отправлена");
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
      className="mb-auto p-5 font-anonymous text-white-darker-1 bg-black-light-2 bg-opacity-40 border-1 border-black-light-2 w-[90%] sm:w-2/3 sm:p-14 sm:py-10 rounded-xl flex items-center flex-col gap-2 sm:gap-6"
    >
      <h2 className="text-3xl font-bold text-center">Заказ</h2>
      <fieldset className="flex flex-col gap-3 w-full">
        <h3 className="text-2xl font-bold mb-3">Личные данные</h3>
        <Input
          error={errors.name}
          name="name"
          label="ФИО"
          placeholder="Пример Примеров"
          onChange={onChange}
          required
        />
        <Input
          error={errors.phone}
          name="phone"
          label="Телефон"
          placeholder="+7(999) 252 25-25"
          type="tel"
          onChange={onChange}
          required
        />

        <Input
          error={errors.email}
          name="email"
          label="Почта"
          placeholder="primer@mail.com"
          type="email"
          onChange={onChange}
          required
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
          onChange={onChange}
          required
        />
        <Input
          error={errors.street}
          name="street"
          label="Улица"
          placeholder="Вайнера"
          type="text"
          onChange={onChange}
          required
        />
        <div className="flex flex-row items-center justify-between gap-10 w-full">
          <Input
            error={errors.house}
            name="house"
            label="Дом"
            placeholder="1"
            type="number"
            width="w-full"
            onChange={onChange}
            required
          />
          <Input
            error={errors.flat}
            name="flat"
            label="Квартира"
            placeholder="1"
            type="number"
            width="100%"
            onChange={onChange}
            required
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
