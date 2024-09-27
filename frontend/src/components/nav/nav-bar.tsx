import { NavLink } from "react-router-dom";
import Cart from "../../assets/icons/cart";
import Logo from "../../assets/icons/logo";
import Order from "../../assets/icons/order";
import User from "../../assets/icons/user";
import NavIco from "./nav-ico";

const NavBar = () => {
  return (
    <nav className="w-24 bg-black text-white h-full px-2 py-5">
      <ul className="flex flex-col items-center gap-16">
        <li>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </li>
        <li>
          <NavIco src="/icons/nav-user.svg" alt="profile" to="/profile">
            <User />
          </NavIco>
        </li>
        <li>
          <NavIco src="/icons/cart.svg" alt="cart" to="/cart">
            <Cart />
          </NavIco>
        </li>
        <li>
          <NavIco src="/icons/fi-rr-box-alt.svg" alt="orders" to="/orders">
            <Order />
          </NavIco>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
