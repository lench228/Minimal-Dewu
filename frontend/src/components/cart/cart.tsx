import Link from "../../assets/icons/link";
import AddGood from "../popups/good-popup/add-good";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { addUrlAndValidate, selectError, selectUrl } from "../home/home-slice";
import HomePage from "../home/home";

const Cart = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex gap-10 items-center justify-center h-full">
      <HomePage></HomePage>
      <aside>
        <div className="text-9xl">cart</div>
      </aside>
    </div>
  );
};

export default Cart;
