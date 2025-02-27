import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface iError {
  text: string;
  isFixed?: boolean;
}

const ErrorMessage: React.FC<iError> = ({ text, isFixed }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <article
      className={clsx(
        "flex gap-2 flex-row items-center pl-10  transform transition-opacity duration-500 ease-in-out",

        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        isFixed && "absolute left-1/2 bottom-10 pl-0 w-full mr-20",
        isFixed && window.screen.width <= 425 && "left-1/4 bottom-1/4",
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.293 7.29301L12 10.586L8.70702 7.29301L7.29302 8.70701L10.586 12L7.29302 15.293L8.70702 16.707L12 13.414L15.293 16.707L16.707 15.293L13.414 12L16.707 8.70701L15.293 7.29301Z"
          fill="#A31B1B"
        />
        <path
          d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22Z"
          fill="#A31B1B"
        />
      </svg>

      <p className="text-error font-anonymous text-xl underline">{text}</p>
    </article>
  );
};

export default ErrorMessage;
