import { NavLink } from "react-router-dom";

interface iNavIco {
  children: React.ReactNode;
  src: string;
  alt: string;
  to: string;
}

const NavIco: React.FC<iNavIco> = ({ src, alt, to, children }) => {
  return (
    <NavLink to={to} className="cursor-pointer">
      <button className="w-full   h-20 hover:bg-white-darker-2 rounded-xl">
        {children}
      </button>
    </NavLink>
  );
};

export default NavIco;
