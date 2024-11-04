import Link from "../../assets/icons/link";
import AddGood from "../popups/good-popup/add-good";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import {
  addUrlAndValidate,
  selectError,
  selectGood,
  selectUrl,
} from "../home/home-slice";
import HomePage from "../home/home";
import { selectGoods } from "./cart-slice";
import CartItem from "./cart-item";

const Cart = () => {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);
  return (
    <div className="w-full flex gap-10 items-center justify-center h-full">
      <HomePage inputWidth={"600px"}></HomePage>
      <aside
        className={
          "border-black-light-2 border-2 rounded-xl w-2/5 text-white-darker-1 px-10 py-2 justify-center"
        }
      >
        <h2 className={"text-4xl font-anonymous font-bold text-center"}>
          Корзина
        </h2>
        <ul className="">
          {goods.map((good) => (
            <CartItem key={good.id} good={good} />
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Cart;
