import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenPage from "./pages/MenPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Pass category via URL param instead of prop */}
        <Route path="/:category" element={<MenPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
