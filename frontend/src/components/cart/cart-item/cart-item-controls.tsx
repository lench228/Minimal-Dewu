import React from "react";
import Counter from "../../counter/counter";
import DeleteButton from "../../../assets/icons/deleteButton";
import { removeAllGood } from "../cart-slice";
import { useDispatch } from "react-redux";

interface CartItemControlsProps {
  id: number;
}

const CartItemControls: React.FC<CartItemControlsProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  return (
    <div className={"flex justify-between pt-2 mb-16"}>
      <Counter id={props.id}></Counter>
      <DeleteButton
        onClick={() => {
          dispatch(removeAllGood(props.id));
        }}
      ></DeleteButton>
    </div>
  );
};

export default CartItemControls;
