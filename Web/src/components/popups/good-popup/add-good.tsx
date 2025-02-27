import { useSelector } from "react-redux";

import React from "react";
import { selectIsLoading } from "../../home/model/home-slice";

const AddGood = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <button type="submit" disabled={isLoading}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group"
      >
        <path
          className="group-hover:fill-black-light-2"
          d="M24 11H13V0H11V11H0V13H11V24H13V13H24V11Z"
          fill="#D5D5D5"
        />
      </svg>
    </button>
  );
};

export default AddGood;
