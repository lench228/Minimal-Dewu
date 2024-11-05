import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, addCounter, selectCounterById, sub } from "./counter.slice";
import { addGood, removeSingleGood, selectGoods } from "../cart/cart-slice";

interface iCounter {
  id: number;
}

const Counter: React.FC<iCounter> = ({ id }) => {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);
  const counter = useSelector(selectCounterById(id));
  useEffect(() => {
    dispatch(addCounter(id));
  }, [dispatch, id]);
  return (
    <div className="flex items-center">
      <button
        disabled={counter && counter.count === 1}
        onClick={() => {
          dispatch(sub(id));
          dispatch(removeSingleGood(id));
        }}
        className="border-[1px] border-white-darker-2 flex items-center px-3 py-1"
      >
        -
      </button>
      <button className="px-3 py-1 border-[1px] border-white-darker-2">
        {counter ? <p>{counter.count}</p> : <p>"Ошибка"</p>}
      </button>
      <button
        onClick={() => {
          dispatch(add(id));
          const good = goods.find((good) => good.id === id);
          if (good) {
            dispatch(addGood(good && good));
          }
        }}
        className="border-[1px] border-white-darker-2 flex items-center px-3 py-1"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
