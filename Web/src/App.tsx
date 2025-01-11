import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import HomePage from "./components/home/home";
import Cart from "./components/cart/cart";
import { AuthPopup } from "./components/popups/auth/auth-popup";
import React, { useEffect } from "react";
import { Profile } from "./components/profile/profile";
import { Popup } from "./components/popups/popup";
import Ship from "./components/shippings/ship";
import { GoodPopup } from "./components/popups/good-popup/good-popup";
import { ProtectedRoute } from "./utils/protectedRoute";

import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthChecked,
  selectIsLoading,
  selectUser,
} from "./components/popups/auth/model/auth.slice";
import { AppDispatch } from "./services/store";
import { getUserDataThunk } from "./components/popups/auth/model/authActions";

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const backgroundLocation = state?.background;

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  useEffect(() => {
    if (!user && !isLoading && !isAuthChecked) {
      dispatch(getUserDataThunk());
    }
  }, []);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute onlyUnAuth>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute onlyUnAuth>
                <Ship />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center  flex-col">
                <img
                  src={"./dist/illustrations/error-404.png"}
                  className={"w-1/2 "}
                />
                <p className={"text-3xl font-rubik text-white-darker-2"}>
                  Not Found Page
                </p>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Popup isReset={true}>
                  <AuthPopup />
                </Popup>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/goods/:id"
            element={
              <Popup>
                <GoodPopup />
              </Popup>
            }
          />
          <Route
            path="/orderSuccess"
            element={
              <Popup>
                <div className={"flex m-auto flex-col items-center"}>
                  <img
                    width={"600"}
                    height={"600"}
                    alt={"Успех"}
                    src={"../dist/illustrations/order_final.png"}
                  />
                  <p
                    className={
                      "font-main font-bold text-3xl text-white-darker-1 align-middle"
                    }
                  >
                    Заказ успешно совершен!
                  </p>
                </div>
              </Popup>
            }
          />
        </Routes>
      )}
    </>
  );
};
export default App;
