import React from "react";
import { iAddress } from "../../lib/definitions";

interface ShipFooterProps {
  total: number;
  userData: {
    fullName: string;
    phone: string;
  };
  address: iAddress;
}

const ShipFooter: React.FC<ShipFooterProps> = ({
  total,
  userData,
  address,
}) => {
  return (
    <footer className={"pt-10 flex  items-center justify-between"}>
      <div>
        <p>Телефон получателя: {userData.phone}</p>
        <p>ФИО получателя: {userData.fullName}</p>
        <span>Детали заказа</span>
        <p>Место получения: </p>
        <p className={"pl-4"}>
          {address.city + address.street + address.house + address.flat}
        </p>
      </div>
      <div>
        <p className={"flex items-center flex-col"}>
          Общая сумма заказа
          <span className={"font-bold text-2xl"}>{total}₽</span>
        </p>
      </div>
    </footer>
  );
};

export default ShipFooter;
