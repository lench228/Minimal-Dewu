import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "../nav/nav-bar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="h-full  flex justify-center sm:flex-row flex-col-reverse bg-[#2b2b2b]">
      <NavBar />
      <main className="w-full h-full mt-auto flex sm:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
