import React from "react";
import {iSvg} from "../../utils/definitions";

const User: React.FC<iSvg> = ({...props }) => {
  return (
    <svg
      className="nav-icon"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={`${props.isActive ? 'fill-black-light' : 'fill-white-darker-1'}`}
        d="M38 39.9994C39.9778 39.9994 41.9112 39.4129 43.5557 38.3141C45.2002 37.2153 46.4819 35.6535 47.2388 33.8263C47.9957 31.999 48.1937 29.9883 47.8079 28.0485C47.422 26.1087 46.4696 24.3269 45.0711 22.9284C43.6726 21.5298 41.8907 20.5774 39.9509 20.1916C38.0111 19.8057 36.0004 20.0038 34.1732 20.7606C32.3459 21.5175 30.7841 22.7992 29.6853 24.4437C28.5865 26.0882 28 28.0216 28 29.9994C28.0027 32.6508 29.0571 35.1928 30.9319 37.0676C32.8067 38.9424 35.3487 39.9968 38 39.9994ZM38 23.3328C39.3186 23.3328 40.6075 23.7238 41.7038 24.4563C42.8001 25.1889 43.6546 26.23 44.1592 27.4482C44.6638 28.6664 44.7958 30.0068 44.5386 31.3C44.2813 32.5932 43.6464 33.7811 42.7141 34.7135C41.7817 35.6458 40.5938 36.2808 39.3006 36.538C38.0074 36.7952 36.667 36.6632 35.4488 36.1586C34.2306 35.6541 33.1894 34.7996 32.4569 33.7032C31.7243 32.6069 31.3333 31.318 31.3333 29.9994C31.3333 28.2313 32.0357 26.5356 33.286 25.2854C34.5362 24.0352 36.2319 23.3328 38 23.3328Z"
        fill="#EAEAEA"
      />
      <path className={`${props.isActive ? 'fill-black-light' : 'fill-white-darker-1'}`}
        d="M38 43.3339C34.0231 43.3383 30.2104 44.9201 27.3983 47.7322C24.5862 50.5443 23.0044 54.357 23 58.3339C23 58.7759 23.1756 59.1998 23.4882 59.5124C23.8007 59.825 24.2246 60.0006 24.6667 60.0006C25.1087 60.0006 25.5326 59.825 25.8452 59.5124C26.1577 59.1998 26.3333 58.7759 26.3333 58.3339C26.3333 55.2397 27.5625 52.2722 29.7504 50.0843C31.9383 47.8964 34.9058 46.6672 38 46.6672C41.0942 46.6672 44.0617 47.8964 46.2496 50.0843C48.4375 52.2722 49.6667 55.2397 49.6667 58.3339C49.6667 58.7759 49.8423 59.1998 50.1548 59.5124C50.4674 59.825 50.8913 60.0006 51.3333 60.0006C51.7754 60.0006 52.1993 59.825 52.5118 59.5124C52.8244 59.1998 53 58.7759 53 58.3339C52.9956 54.357 51.4138 50.5443 48.6017 47.7322C45.7896 44.9201 41.9769 43.3383 38 43.3339Z"
        fill="#EAEAEA"
      />
    </svg>
  );
};

export default User;
