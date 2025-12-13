import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-rose-950 w-full h-[50dvh] flex flex-col items-center justify-center">
      <div className="text-white flex flex-col items-center justify-center w-full h-full mt-10 gap-3">
        <h1 className="font-semibold text-5xl sale-font">30% Off Sitewide</h1>
        <p className="text-3xl text-center lg:text-3xl font-light">Plus 50% off faves</p>

        <div className="flex gap-4 lg:mt-4 mt-8 text-xs font-semibold">
          <Link
            to="/men"
            className="border-amber-50 transform duration-150 hover:bg-white hover:text-black border-2 rounded-3xl lg:px-9 px-9 py-2 lg:py-2"
          >
            SHOP MEN
          </Link>

          <Link
            to="/women"
            className="border-amber-50 transform duration-150 hover:bg-white hover:text-black border-2 rounded-3xl px-6 py-2"
          >
            SHOP WOMEN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
