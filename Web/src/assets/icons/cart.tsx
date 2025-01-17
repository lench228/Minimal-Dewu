import React, { useEffect, useRef } from "react";
import { iSvg } from "../../utils/definitions-svg";
import { useSelector } from "react-redux";
import { selectGoods } from "../../components/cart/cart-slice";

const Cart: React.FC<iSvg> = ({ ...props }) => {
  const goodsCount = useSelector(selectGoods).length;

  const refSvg = useRef<SVGPathElement>(null);

  const refP = useRef<HTMLParagraphElement>(null);

  useEffect(() => {}, [props.isActive]);
  return (
    <a
      className={
        "flex flex-col items-center hover:bg-white-darker-2 w-full h-full rounded-xl"
      }
      onMouseEnter={() => {
        if (refSvg.current && refP.current) {
          refP.current.classList.remove("text-white-darker-1");
          refP.current.classList.add("text-black-light");

          refSvg.current.classList.remove("fill-white-darker-1");
          refSvg.current.classList.add("fill-black-light");

          if (props.isActive) {
            refP.current.classList.add("text-white-darker-1");
            refP.current.classList.remove("text-black-light");

            refSvg.current.classList.add("fill-white-darker-1");
            refSvg.current.classList.remove("fill-black-light");
          }
        }
      }}
      onMouseLeave={() => {
        if (refSvg.current && refP.current) {
          refP.current.classList.add("text-white-darker-1");
          refP.current.classList.remove("text-black-light");

          refSvg.current.classList.add("fill-white-darker-1");
          refSvg.current.classList.remove("fill-black-light");
          if (props.isActive) {
            refP.current.classList.remove("text-white-darker-1");
            refP.current.classList.add("text-black-light");

            refSvg.current.classList.remove("fill-white-darker-1");
            refSvg.current.classList.add("fill-black-light");
          }
        }
      }}
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"nav-icon pt-1"}
      >
        <path
          ref={refSvg}
          className={`${props.isActive ? "fill-black-light" : "fill-white-darker-1"} hover:fill-white-darker-1`}
          d="M35 10H30C30 7.34784 28.9464 4.8043 27.0711 2.92893C25.1957 1.05357 22.6522 0 20 0C17.3478 0 14.8043 1.05357 12.9289 2.92893C11.0536 4.8043 10 7.34784 10 10H5C3.67392 10 2.40215 10.5268 1.46447 11.4645C0.526784 12.4021 0 13.6739 0 15L0 31.6667C0.00264643 33.876 0.88147 35.9941 2.4437 37.5563C4.00593 39.1185 6.12401 39.9974 8.33333 40H31.6667C33.876 39.9974 35.9941 39.1185 37.5563 37.5563C39.1185 35.9941 39.9974 33.876 40 31.6667V15C40 13.6739 39.4732 12.4021 38.5355 11.4645C37.5979 10.5268 36.3261 10 35 10ZM20 3.33333C21.7681 3.33333 23.4638 4.03571 24.714 5.28595C25.9643 6.5362 26.6667 8.23189 26.6667 10H13.3333C13.3333 8.23189 14.0357 6.5362 15.286 5.28595C16.5362 4.03571 18.2319 3.33333 20 3.33333ZM36.6667 31.6667C36.6667 32.9927 36.1399 34.2645 35.2022 35.2022C34.2645 36.1399 32.9927 36.6667 31.6667 36.6667H8.33333C7.00725 36.6667 5.73548 36.1399 4.7978 35.2022C3.86012 34.2645 3.33333 32.9927 3.33333 31.6667V15C3.33333 14.558 3.50893 14.134 3.82149 13.8215C4.13405 13.5089 4.55797 13.3333 5 13.3333H10V16.6667C10 17.1087 10.1756 17.5326 10.4882 17.8452C10.8007 18.1577 11.2246 18.3333 11.6667 18.3333C12.1087 18.3333 12.5326 18.1577 12.8452 17.8452C13.1577 17.5326 13.3333 17.1087 13.3333 16.6667V13.3333H26.6667V16.6667C26.6667 17.1087 26.8423 17.5326 27.1548 17.8452C27.4674 18.1577 27.8913 18.3333 28.3333 18.3333C28.7754 18.3333 29.1993 18.1577 29.5118 17.8452C29.8244 17.5326 30 17.1087 30 16.6667V13.3333H35C35.442 13.3333 35.866 13.5089 36.1785 13.8215C36.4911 14.134 36.6667 14.558 36.6667 15V31.6667Z"
          fill="#EAEAEA"
        />
      </svg>

      <p
        ref={refP}
        className={`$text-xl font-bold hover:text-black-light-2  ${!props.isActive ? "text-white-darker-1" : "text-black-light-2"} font-anonymous`}
      >
        {goodsCount}
      </p>
    </a>
  );
};

export default Cart;
