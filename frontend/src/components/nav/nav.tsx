const Nav = () => {
    return (
     <nav className="w-24 bg-black text-white h-full px-2 py-5">
        <ul className="flex flex-col items-center gap-16">
            <li>
                <a href="/">
                    <img src="/icons/logo.svg" alt="logo" className="w-10 h-10" />
                </a>
            </li>
            <li>
                <a href="/">
                    <img src="/icons/nav-user.svg" alt="logo" className="w-10 h-10" />
                </a>
            </li>     
            <li>
                <a href="/">
                    <img src="/icons/cart.svg" alt="logo" className="w-10 h-10" />
                </a>
            </li>   
                   <li>
                <a href="/">
                    <img src="/icons/fi-rr-box-alt.svg" alt="logo" className="w-10 h-10" />
                </a>
            </li>
        </ul>
    </nav>
    );
}
 
export default Nav;
