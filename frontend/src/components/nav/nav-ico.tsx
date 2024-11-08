import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";

interface iNavIco {
  children: React.ReactNode;
  src: string;
  alt: string;
  to: string;
  isActive: boolean;
}

const NavIco: React.FC<iNavIco> = ({ src, alt, to, children, isActive }) => {
  return (
    <NavLink
      className={`${isActive && "bg-white-darker-2"} cursor-pointer w-20 h-20 hover:bg-white-darker-2 rounded-xl flex flex-col items-center justify-center`}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavIco;
