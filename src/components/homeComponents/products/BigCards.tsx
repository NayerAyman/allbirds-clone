import { Link } from "react-router-dom";

export default function BigCards() {
  return (
    <div className="mx-auto my-8 w-full flex flex-col lg:flex-row gap-6 lg:gap-2 p-4 justify-center">

      <div
        className="rounded-3xl mx-auto flex flex-col items-center justify-center gap-6 relative big-card h-[63dvh] lg:h-[80dvh]"
        style={{
          backgroundImage: `url(/Breezer_Mary_Jane_3x_Promo_Tile.webp)`,
          backgroundPosition: 'center',  
          width: '99%',                
        }}
      >
        <h1 className="text-white text-4xl tracking-widest sale-font">Holiday Dressing</h1>

        <div className="w-full flex items-center justify-center gap-3 absolute bottom-3">
          <Link
            to="/men"
            className="border border-white rounded-3xl flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-200 py-2 px-4 text-sm w-[45%]"
          >
            SHOP MEN
          </Link>
          <Link
            to="/women"
            className="border border-white rounded-3xl  flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-200 py-2 px-4 text-sm w-[45%]"
          >
            SHOP WOMEN
          </Link>
        </div>
      </div>

      <div
        className="rounded-3xl mx-auto flex flex-col items-center justify-center gap-6 relative big-card h-[63dvh] lg:h-[80dvh]"
        style={{
          backgroundImage: `url(/Waterproof_3x_Promo_Tile.webp)`,
          backgroundPosition: 'center',  
          width: '99%',                
        }}
      >
        <h1 className="text-white text-4xl tracking-widest sale-font">Stormy Styles</h1>

        <div className="w-full flex items-center justify-center gap-3 absolute bottom-3">
          <Link
            to="/men"
            className="border border-white rounded-3xl flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-200 py-2 px-4 text-sm w-[45%]"
          >
            SHOP MEN
          </Link>
          <Link
            to="/women"
            className="border border-white rounded-3xl flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-200 py-2 px-4 text-sm w-[45%]"
          >
            SHOP WOMEN
          </Link>
        </div>
      </div>

      <div
        className="rounded-3xl mx-auto flex flex-col items-center justify-center gap-6 relative big-card h-[63dvh] lg:h-[80dvh]"
        style={{
          backgroundImage: `url(/Wool_Cruiser_3x_Promo_Tile.webp)`,
          backgroundPosition: 'center',  
          width: '99%',                
        }}
      >
        <h1 className="text-white text-4xl tracking-widest sale-font">Cruise in Color</h1>

        <div className="w-full flex items-center justify-center gap-3 absolute bottom-3">
          <Link
            to="/men"
            className="border border-white rounded-3xl flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-200 py-2 px-4 text-sm w-[45%]"
          >
            SHOP MEN
          </Link>
          <Link
            to="/women"
            className="border border-white rounded-3xl flex items-center justify-center text-white hover:text-black hover:bg-white transition-colors duration-200 py-2 px-4 text-sm w-[45%]"
          >
            SHOP WOMEN
          </Link>
        </div>
      </div>

    </div>
  );
}
