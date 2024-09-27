import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/nav-bar";
import Layout from "./components/layout/layout";
import HomePage from "./components/home/home";
import Cart from "./components/cart/cart";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
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

export default App;
