import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenPage from "./pages/MenPage";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";

function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login"; // hide Navbar/Footer on login

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <div className={`flex-1 ${!hideLayout ? "bg-orange-50" : "bg-white"}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:category" element={<MenPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
