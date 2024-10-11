import { addGood } from "../../lib/actions/addGood";
import { useState } from "react";

const AddLink = () => {
  const handleAddLinkClick = async () => {
    const good = addGood(localStorage.getItem("url"));
    setIsLoading(true);
    good.then((res) => {}).finally(() => setIsLoading(false));
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      disabled={isLoading}
      className={`${isLoading ? `animate-spin` : ""}`}
      onClick={() => handleAddLinkClick()}
    >
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

export default AddLink;
