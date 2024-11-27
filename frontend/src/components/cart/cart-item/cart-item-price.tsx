import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCounterById } from "../../counter/counter.slice";
const arrow = (
  <svg
    width="18"
    height="8"
    viewBox="0 0 18 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 3.99994H16.5M16.5 3.99994C16.3933 3.14661 15.156 1.43994 11.06 1.43994M16.5 3.99994C16.0733 4.85327 14.388 6.55994 11.06 6.55994"
      stroke="#EAEAEA"
    />
  </svg>
);

interface CartItemProps {
  priceCNY: number;
  priceRU: number;
  id: number;
}
const CartItemPrice: React.FC<CartItemProps> = ({ id, priceRU, priceCNY }) => {
  const counter = useSelector(selectCounterById(id));

  return (
    <footer className={"flex items-center gap-1 justify-center mt-2"}>
      {counter && priceCNY * counter.count}¥{arrow}
      {counter && priceRU * counter.count}₽
    </footer>
  );
};

export default CartItemPrice;
