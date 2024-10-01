import { NavLink } from "react-router-dom";
import React from "react";

interface iNavIco {
  children: React.ReactNode;
  src: string;
  alt: string;
  to: string;
  isActive: boolean;
}

const NavIco: React.FC<iNavIco> = ({ src, alt, to, children, isActive }) => {
  return (
    <NavLink to={to} className="cursor-pointer">
      <button className={`${isActive && 'bg-white-darker-2'} w-full h-20 hover:bg-white-darker-2 rounded-xl`}>
        {children}
      </button>
    </NavLink>
  );
};

export default NavIco;
