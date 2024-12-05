import React from "react";

interface Props {
  onClick: () => void;
}
function Edit({ onClick }: Props) {
  return (
    <button type={"button"} onClick={() => onClick()}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_395_1283)">
          <path
            d="M22.8533 1.14801C22.1734 0.469212 21.252 0.0879517 20.2913 0.0879517C19.3305 0.0879517 18.4091 0.469212 17.7293 1.14801L1.46526 17.412C0.999511 17.8751 0.630221 18.426 0.378757 19.0328C0.127293 19.6396 -0.00135384 20.2902 0.000259122 20.947V23C0.000259122 23.2652 0.105616 23.5196 0.293152 23.7071C0.480689 23.8947 0.735043 24 1.00026 24H3.05326C3.71002 24.0019 4.36063 23.8734 4.96741 23.6221C5.5742 23.3708 6.12511 23.0017 6.58826 22.536L22.8533 6.27101C23.5318 5.59121 23.9128 4.66998 23.9128 3.70951C23.9128 2.74905 23.5318 1.82782 22.8533 1.14801ZM5.17426 21.122C4.61026 21.6823 3.84822 21.9977 3.05326 22H2.00026V20.947C1.99925 20.5529 2.07642 20.1625 2.2273 19.7985C2.37818 19.4344 2.59977 19.1039 2.87926 18.826L15.2223 6.48301L17.5223 8.78302L5.17426 21.122ZM21.4383 4.85701L18.9323 7.36401L16.6323 5.06901L19.1393 2.56201C19.2903 2.41132 19.4695 2.29185 19.6667 2.21042C19.8639 2.129 20.0752 2.0872 20.2885 2.08744C20.5019 2.08767 20.7131 2.12992 20.9101 2.21178C21.1071 2.29363 21.2861 2.41349 21.4368 2.56451C21.5875 2.71553 21.7069 2.89476 21.7884 3.09195C21.8698 3.28914 21.9116 3.50044 21.9113 3.71378C21.9111 3.92713 21.8689 4.13833 21.787 4.33535C21.7051 4.53236 21.5853 4.71132 21.4343 4.86201L21.4383 4.85701Z"
            fill="#D5D5D5"
          />
        </g>
        <defs>
          <clipPath id="clip0_395_1283">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default Edit;
