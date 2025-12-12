import {
  FiHelpCircle,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // <-- مهم

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full mt-3 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* DESKTOP NAVBAR */}
      <div className="hidden lg:flex lg:mx-auto lg:w-[97%] lg:h-12  lg:items-center lg:justify-between bg-white bg-opacity-90 backdrop-blur-md shadow-md  lg:rounded-2xl px-4">
        <Link to="/" className="text-3xl font-semibold logo-font">
          allbirds
        </Link>

        <ul className="flex gap-6 font-medium lg:ml-55 text-sm">
          <li><Link to="/men">MEN</Link></li>
          <li><Link to="/women">WOMEN</Link></li>
          <li><Link to="/sale">SALE</Link></li>
        </ul>

        <div className="flex items-center gap-6">
          <ul className="flex gap-4 text-sm font-normal">
            <li><Link to="/stores">Our Stores</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/rerun">ReRun</Link></li>
          </ul>

          <ul className="flex gap-4 text-lg font-semibold">
            <li><button><FiSearch /></button></li>
            <li><button><FiUser /></button></li>
            <li><button><FiHelpCircle /></button></li>
            <li><button><FiShoppingBag /></button></li>
          </ul>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="flex flex-col lg:hidden w-full items-center px-4">
        <div className="w-full bg-stone-100 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
          {/* Top */}
          <div className="flex items-center justify-between px-4 py-2">
            <button className="text-2xl"><FiMenu /></button>
            <Link to="/" className="text-3xl ml-9 font-bold logo-font">allbirds</Link>
            <div className="flex gap-3 text-2xl">
              <button><FiSearch /></button>
              <button><FiShoppingBag /></button>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-center bg-[#f4eed8] px-2 rounded-b-3xl">
            {["MEN", "WOMEN", "NEW ARRIVALS", "BESTSELLERS"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/ /g, "-")}`} // تحويل النص لpath
                className="px-3 py-3 text-xs text-nowrap font-semibold rounded-md hover:bg-stone-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
