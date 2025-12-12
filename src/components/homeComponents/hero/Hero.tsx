import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div
      className="sm:w-[99%] w-[95%] sm:h-[82vh] h-[80vh] sm:bg-cover bg-center rounded-[20px] mt-5 p-7"
      style={{
        backgroundImage: `url("/25Q4_December30_Off_Site_Homepage_Hero_Desktop_16x9_6f6af730-55cf-4ff6-aa90-690a1a1445a6.webp")`,
      }}
    >
      <div className="flex flex-col sm:items-end items-start justify-end sm:justify-end h-full w-full gap-5 sm:px-8 py-4">
        <p className="font-semibold text-[12px] tracking-widest text-white">
          ORDER TODAY. COMFORT BY CHRISTMAS.
        </p>

        <h1 className="font-semibold text-[26px] text-white">
          Feel Good Gifting. Feel Great Prices.
        </h1>

        <div className="flex flex-row gap-2">
          <Link
            to="/men"
            className="border-amber-50 border transform duration-300 hover:text-white hover:bg-gray-900 rounded-3xl px-6 py-2 bg-white text-xs font-semibold"
          >
            SHOP MEN
          </Link>

          <Link
            to="/women"
            className="border-amber-50 border transform duration-300 hover:text-white hover:bg-gray-900 rounded-3xl px-6 py-2 bg-white text-xs font-semibold"
          >
            SHOP WOMEN
          </Link>
        </div>
      </div>
    </div>
  );
}
