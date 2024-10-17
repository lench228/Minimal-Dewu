import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import HomePage from "./components/home/home";
import Cart from "./components/cart/cart";
import { AuthPopup } from "./components/popups/auth/auth-popup";
import React from "react";
import { Profile } from "./components/profile/profile";
import { Popup } from "./components/popups/popup";

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="*"
            element={
              <div className="flex justify-center text-9xl">Not Found</div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
