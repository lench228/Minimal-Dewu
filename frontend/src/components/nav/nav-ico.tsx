import { NavLink } from "react-router-dom";

interface iNavIco {
  src: string;
  alt: string;
  to: string;
}

const NavIco: React.FC<iNavIco> = ({ src, alt, to }) => {
  return (
    <NavLink to={to}>
      <img src={src} alt={alt} className="w-10 h-10" />
    </NavLink>
  );
};

export default NavIco;
