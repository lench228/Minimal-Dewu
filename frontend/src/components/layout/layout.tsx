import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "../nav/nav-bar";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "../popups/popup";
import { AuthPopup } from "../popups/auth/auth-popup";
import {
  selectActivePopup,
  selectGood,
  selectIsPopupOpen,
  setActivePopup,
  setIsPopupOpen,
} from "../home/home-slice";
import { GoodPopup } from "../popups/good-popup/good-popup";

const Layout: React.FC<{
  isAuthenticated: boolean;
}> = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const activePopup = useSelector(selectActivePopup);
  const good = useSelector(selectGood);
  const isPopupOpen = useSelector(selectIsPopupOpen);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  //@todo Сделать нормальный приватный роут
  // Закрытые маршруты
  const closedRoutes = ["/profile", "/order"];
  useEffect(() => {
    const isProtectedRoute = closedRoutes.includes(location.pathname);

    if (isProtectedRoute && !isAuthenticated) {
      if (!searchParams.has("open")) {
        dispatch(setActivePopup("login"));
        setSearchParams({ open: "login", type: "email" });
        dispatch(setIsPopupOpen(true));
      }
    }
  }, [location.pathname, isAuthenticated, searchParams, setSearchParams]);

  return (
    <div className="h-full flex bg-[#2b2b2b]">
      <NavBar />
      <main className="w-full">
        <Outlet />
      </main>
      {isPopupOpen && (
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
