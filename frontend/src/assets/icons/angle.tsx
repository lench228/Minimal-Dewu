import React, { ButtonHTMLAttributes, useState } from "react";

interface AngleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

const Angle: React.FC<AngleProps> = ({ onClick, isOpen }) => {
  return (
    <button onClick={onClick}>
      <svg
        transform={isOpen ? "rotate(-180)" : "rotate(0)"}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.3015 15.0516C34.1311 14.8797 33.9283 14.7433 33.7049 14.6503C33.4815 14.5572 33.2419 14.5093 32.9998 14.5093C32.7578 14.5093 32.5182 14.5572 32.2948 14.6503C32.0714 14.7433 31.8686 14.8797 31.6982 15.0516L23.3015 23.4482C23.1311 23.6201 22.9283 23.7564 22.7049 23.8495C22.4815 23.9426 22.2418 23.9905 21.9998 23.9905C21.7578 23.9905 21.5182 23.9426 21.2948 23.8495C21.0714 23.7564 20.8686 23.6201 20.6982 23.4482L12.3015 15.0516C12.1311 14.8797 11.9283 14.7433 11.7049 14.6503C11.4815 14.5572 11.2418 14.5093 10.9998 14.5093C10.7578 14.5093 10.5182 14.5572 10.2948 14.6503C10.0714 14.7433 9.86859 14.8797 9.69816 15.0516C9.3567 15.3951 9.16504 15.8597 9.16504 16.3441C9.16504 16.8284 9.3567 17.2931 9.69816 17.6366L18.1132 26.0516C19.1444 27.0815 20.5423 27.66 21.9998 27.66C23.4573 27.66 24.8552 27.0815 25.8865 26.0516L34.3015 17.6366C34.643 17.2931 34.8346 16.8284 34.8346 16.3441C34.8346 15.8597 34.643 15.3951 34.3015 15.0516V15.0516Z"
          fill="#D5D5D5"
        />
      </svg>
    </button>
  );
};

export default Angle;