import React from "react";
import NavBar from "../nav/nav-bar";
import { Outlet } from "react-router-dom";
import HomePage from "../home/home";

const Layout: React.FC = () => {
  return (
    <div className="h-full flex  bg-[#2b2b2b]">
      <NavBar></NavBar>
      <main className="w-full">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
