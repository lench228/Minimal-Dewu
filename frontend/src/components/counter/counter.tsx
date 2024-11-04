import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, addCounter, selectCounterById, sub } from "./counter.slice";

interface iCounter {
  name: string;
}

const Counter: React.FC<iCounter> = ({ name }) => {
  const dispatch = useDispatch();
  const counter = useSelector(selectCounterById(name));
  useEffect(() => {
    dispatch(addCounter(name));
  }, [dispatch, name]);
  return (
    <div className="flex items-center">
      <button
        onClick={() => dispatch(sub(name))}
        className="border-[1px] border-white-darker-2 flex items-center px-3 py-1"
      >
        -
      </button>
      <button className="px-3 py-1 border-[1px] border-white-darker-2">
        {counter ? <p>{counter.count}</p> : <p>"Ошибка"</p>}
      </button>
      <button
        onClick={() => dispatch(add(name))}
        className="border-[1px] border-white-darker-2 flex items-center px-3 py-1"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
