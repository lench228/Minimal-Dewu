import React from "react";
import NavBar from "../nav/nav-bar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="h-full flex ">
      <NavBar></NavBar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
