import React from "react";
import Input from "../ui/input/input";

interface iOrderForm {}

const OrderForm: React.FC<iOrderForm> = () => {
  return (
    <form
      className={
        "font-anonymous text-white-darker-1 bg-black-light-2 bg-opacity-40 border-1 border-black-light-2 w-1/2 p-10 rounded-xl flex flex-col gap-6"
      }
    >
      <h2 className={"text-3xl  font-bold text-center "}>Заказ</h2>
      <fieldset className={"flex flex-col gap-3"}>
        <h3 className={"text-2xl font-bold mb-3"}>Личные данные</h3>
        <Input
          error={""}
          name={""}
          label={"ФИО"}
          placeholder={"Пример Примеров"}
        ></Input>
        <Input
          error={""}
          name={""}
          label={"Телефон"}
          placeholder={"+7(999) 252 25-25"}
        ></Input>
        <Input
          error={""}
          name={""}
          label={"Почта"}
          placeholder={"primer@mail.com"}
        ></Input>
      </fieldset>
      <fieldset className={"flex flex-col gap-3"}>
        <h3 className={"text-2xl font-bold mb-3"}>Доставка</h3>
        <Input
          error={""}
          name={""}
          label={"Город"}
          placeholder={"Екатеринбург"}
        ></Input>
        <Input
          error={""}
          name={""}
          label={"Улица"}
          placeholder={"Вайнера"}
        ></Input>
        <Input error={""} name={""} label={"Дом"} placeholder={"1"}></Input>
        <Input
          error={""}
          name={""}
          label={"Квартира"}
          placeholder={"1"}
        ></Input>
      </fieldset>
    </form>
  );
};

export default OrderForm;
