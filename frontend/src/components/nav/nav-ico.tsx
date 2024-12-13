import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import clsx from "clsx";

interface iNavIco {
  children: React.ReactNode;
  src: string;
  alt: string;
  to: string;
  isActive: boolean;
  isLogo?: boolean;
}

const NavIco: React.FC<iNavIco> = ({ isLogo, to, children, isActive }) => {
  return (
    <NavLink
      className={clsx(
        isActive && "bg-white-darker-2",
        "hover:bg-white-darker-2 rounded-xl flex flex-col items-center justify-center",
        "cursor-pointer",
        window.screen.width <= 680 ? `w-12 h-12` : `w-20 h-20`,
        isLogo && isActive && "bg-white-darker-1",
      )}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavIco;
