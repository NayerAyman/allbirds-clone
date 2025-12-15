import { FiLogOut, FiShoppingBag, FiUser } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../subapase/Auth";
import { supabase } from "../../subapase/SubapaseAPI";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../subapase/SupabaseCart";
import type { CartItem } from "../../subapase/SupabaseCart";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: cart = [] } = useQuery<CartItem[]>({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  // 🔐 Auth
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session?.user);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session?.user);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 📜 Scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(
            window.scrollY <= lastScrollY.current || window.scrollY < 50
          );
          lastScrollY.current = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
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

        <ul className={`flex gap-6 ${!isAuthenticated&& "mr-10"} font-medium  text-sm`}>
          <li><Link to="/men">MEN</Link></li>
          <li><Link to="/women">WOMEN</Link></li>
          <li><Link to="/sale">SALE</Link></li>
        </ul>

        <div className="flex items-center justify-center gap-6">
          <ul className="flex items-center  gap-4 text-lg font-semibold">
            <li>
              <Link to="/login">{isAuthenticated ? <FaHistory /> : <FiUser />}</Link>
            </li>
            <li className="relative">
              <Link to="/cart">
                <FiShoppingBag
                  className={`text-xl ${cartItemsCount > 0 ? "text-green-500" : "text-black"}`}
                />
              </Link>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </li>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hover:text-red-700 rounded-lg transition-colors"
              >
                <FiLogOut />
              </button>
            )}
          </ul>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="flex flex-col lg:hidden w-full items-center px-4">
        <div className="w-full bg-stone-100 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
          {/* Top */}
          <div className="flex items-center text-2xl justify-between px-4 py-2">
            <Link to="/login">{isAuthenticated ? <FaHistory /> : <FiUser />}</Link>
            <Link to="/" className={`text-3xl ${isAuthenticated&& "ml-10"} font-bold logo-font`}>allbirds</Link>
            <div className="flex items-center justify-center gap-3 text-2xl">
              <Link to="/cart" className="relative">
                <FiShoppingBag className={`${cartItemsCount > 0 ? "text-green-500" : "text-black"}`} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                  className="hover:text-red-700 transition-colors"
                >
                  <FiLogOut />
                </button>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-center bg-[#f4eed8] px-2 rounded-b-3xl">
            {["MEN", "WOMEN", "SALE"].map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/ /g, "-")}`}
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
