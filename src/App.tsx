// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenPage from "./pages/MenPage";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";
import Cart from "./pages/Cart";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // المدة التي تبقى فيها البيانات صالحة قبل أن تصبح "قديمة"
      staleTime: 0, // بالمللي ثانية (هنا 1 ثانية فقط)

      // تعطيل إعادة التحميل التلقائي عند التركيب أو التركيز على النافذة
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <div className={`flex-1 ${!hideLayout ? "bg-orange-50" : "bg-white"}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:category" element={<MenPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
