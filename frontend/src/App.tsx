import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/nav-bar";
import Layout from "./components/layout/layout";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<div className="flex justify-center text-9xl">Home</div>}
        />
        <Route
          path="/cart"
          element={<div className="flex justify-center text-9xl">Cart</div>}
        />
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
