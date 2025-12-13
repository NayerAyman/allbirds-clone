import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenPage from "./pages/MenPage";

function App() {
  return (
<BrowserRouter>
      {/* Added min-h-screen to ensure full screen coverage */}
        <Navbar />
      <div className="flex flex-col w-full h-auto bg-orange-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:category" element={<MenPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
