import NavIco from "./nav-ico";

const NavBar = () => {
  return (
    <nav className="w-24 bg-black text-white h-full px-2 py-5">
      <ul className="flex flex-col items-center gap-16">
        <li>
          <NavIco src="/icons/logo.svg" alt="logo" to="/" />
        </li>
        <li>
          <NavIco src="/icons/nav-user.svg" alt="profile" to="/profile" />
        </li>
        <li>
          <NavIco src="/icons/cart.svg" alt="cart" to="/cart" />
        </li>
        <li>
          <NavIco src="/icons/fi-rr-box-alt.svg" alt="orders" to="/orders" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
