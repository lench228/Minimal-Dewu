import {BrowserRouter, Routes, Route, useSearchParams, useLocation, useNavigate} from "react-router-dom";
import NavBar from "./components/nav/nav-bar";
import Layout from "./components/layout/layout";
import HomePage from "./components/home/home";
import Cart from "./components/cart/cart";
import {AuthPopup} from "./components/auth/auth-popup";
import React, {useEffect} from "react";
import {Profile} from "./components/profile/profile";




const App: React.FC = () => {

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const isAuthenticated = false;

    return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout isAuthenticated = {isAuthenticated} setIsPopupOpen = {setIsPopupOpen} />} >
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<Cart  />} />
          <Route path="/profile" element={<Profile/>} />
        <Route
          path="*"
          element={
            <div className="flex justify-center text-9xl">Not Found</div>
          }
        />
      </Route>

    </Routes>
      {isPopupOpen && <AuthPopup setIsPopupOpen={setIsPopupOpen} />}
  </BrowserRouter>
    )
}
export default App;
