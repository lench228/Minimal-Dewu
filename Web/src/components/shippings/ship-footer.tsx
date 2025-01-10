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
    <footer className="pt-8 pb-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full md:w-1/2 space-y-4">
          <div className="text-lg font-medium">
            <p>
              Телефон получателя:
              <span className="text-sm font-normal pl-2 ">
                {userData.phone}
              </span>
            </p>
          </div>
          <div className="text-lg font-medium">
            <p>
              ФИО получателя:
              <span className="text-sm font-normal pl-2 ">
                {userData.fullName}
              </span>
            </p>
          </div>
          <div className="text-lg font-medium">
            <p>Место получения:</p>
            <p className="text-sm font-normal pl-4">
              {`${address.city}, ${address.street}, д. ${address.building}$
                  кв. ${address.apartment}`}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center md:w-1/3">
          <p className="text-lg font-medium ">Общая сумма заказа</p>
          <span className="font-bold text-3xl mt-2">{total}₽</span>
        </div>
      </div>
    </footer>
  );
};

export default ShipFooter;
