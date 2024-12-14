import { NavLink, useLocation } from "react-router-dom";
import Cart from "../../assets/icons/cart";
import Logo from "../../assets/icons/logo";
import Order from "../../assets/icons/order";
import User from "../../assets/icons/user";
import NavIco from "./nav-ico";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="sm:w-24 sticky left-0 bottom-0 w-full min-h-20 mt-auto sm:h-full bg-black text-white flex-grow-1 px-2 py-5">
      <ul className="flex sm:flex-col items-center sm:justify-start justify-center gap-4 sm:gap-16">
        <li>
          <NavIco
            to="/"
            src="/icons/nav-user.svg"
            alt="home"
            isActive={location.pathname === "/"}
            isLogo={true}
          >
            <Logo isActive={location.pathname === "/"} />
          </NavIco>
        </li>
        <li>
          <NavIco
            src="/icons/nav-user.svg"
            alt="profile"
            to="/profile"
            isActive={location.pathname === "/profile"}
          >
            <User isActive={location.pathname === "/profile"} />
          </NavIco>
        </li>
        <li>
          <NavIco
            src="/icons/cart.svg"
            alt="cart"
            to="/cart"
            isActive={location.pathname === "/cart"}
          >
            <Cart isActive={location.pathname === "/cart"} />
          </NavIco>
        </li>
        <li>
          <NavIco
            src="/icons/fi-rr-box-alt.svg"
            alt="orders"
            to="/orders"
            isActive={location.pathname === "/orders"}
          >
            <Order isActive={location.pathname === "/orders"} />
          </NavIco>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
