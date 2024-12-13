import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "../nav/nav-bar";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../popups/popup";
import { AuthPopup } from "../popups/auth/auth-popup";
import {
  selectActivePopup,
  selectGood,
  selectIsLoading,
  setActivePopup,
} from "../home/home-slice";
import { GoodPopup } from "../popups/good-popup/good-popup";
import { selectAuth } from "./auth.slice";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const activePopup = useSelector(selectActivePopup);
  const good = useSelector(selectGood);

  const isAuthenticated = useSelector(selectAuth);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  //@todo Сделать нормальный приватный роут
  // Закрытые маршруты
  const closedRoutes = ["/profile", "/order.tsx"];
  useEffect(() => {
    const isProtectedRoute = closedRoutes.includes(location.pathname);

    if (isProtectedRoute && !isAuthenticated) {
      if (!searchParams.has("open")) {
        dispatch(setActivePopup("login"));
        setSearchParams({ open: "login", type: "email" });
      }
    }
  }, [location.pathname, isAuthenticated, searchParams, setSearchParams]);

  return (
    <div className="h-full  flex justify-center sm:flex-row flex-col-reverse bg-[#2b2b2b]">
      <NavBar />
      <main className="w-full h-full mt-auto flex sm:mt-0">
        <Outlet />
      </main>
      {activePopup && (
        <Popup>
          {activePopup === "login" ? (
            <AuthPopup />
          ) : (
            <GoodPopup good={good}></GoodPopup>
          )}
        </Popup>
      )}
    </div>
  );
};

export { Layout };
