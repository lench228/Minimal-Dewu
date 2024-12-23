import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import HomePage from "./components/home/home";
import Cart from "./components/cart/cart";
import { AuthPopup } from "./components/popups/auth/auth-popup";
import React from "react";
import { Profile } from "./components/profile/profile";
import { Popup } from "./components/popups/popup";
import Ship from "./components/shippings/ship";

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Ship />} />
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center  flex-col">
                <img
                  src={"illustrations/error-404.png "}
                  className={"w-1/2 "}
                />
                <p className={"text-3xl font-anonymous text-white-darker-2"}>
                  Not Found Page
                </p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
