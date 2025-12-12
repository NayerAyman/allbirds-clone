"use client";
import { Link } from "react-router-dom"; 

import { useState, useRef, useEffect } from "react"; // added useEffect
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";

const products = [
  {
    id: "6930103238736",
    title: "Tree Runner Go",
    description: "Blizzard (Blizzard Sole)",
    price: "$60",
    compareAtPrice: "$120",
    image:
      "https://www.allbirds.com/cdn/shop/files/A10645_24Q2_Tree-Runner-GO-Blizzard-Blizzard_PDP_LEFT__2.png?v=1751068969&width=1600",
    url: "/products/mens-tree-runner-go",
  },
  {
    id: "7188364263504",
    title: "Tree Runner NZ",
    description: "Thunder Green (Natural White Sole)",
    price: "$77",
    compareAtPrice: "$110",
    image:
      "https://www.allbirds.com/cdn/shop/files/A12096_25Q3_Tree_Runner_NZ_Thunder_Green_Natural_White_Sole_PDP_LEFT-2000x2000_e1183feb-d71c-486a-a405-eeb1e3e00333.png?v=1751899869&width=1600",
    url: "/products/womens-tree-runner-nz-thunder-green",
  },
  {
    id: "7215630843984",
    title: "Wool Cruiser Waterproof",
    description: "Natural Black (Natural White Sole)",
    price: "$98",
    compareAtPrice: "$140",
    image:
      "https://www.allbirds.com/cdn/shop/files/A11806_25Q3_Wool-Cruiser-Waterproof-Natural-Black-Natural-White-Sole_PDP_LEFT.png?v=1757024954&width=1600",
    url: "/products/mens-wool-cruiser-waterproof-natural-black-natural-white",
  },
  {
    id: "7222392750160",
    title: "Allbirds Slipper",
    description: "Natural White Fluff",
    price: "$37",
    compareAtPrice: "$75",
    image:
      "https://www.allbirds.com/cdn/shop/files/A11826_25Q4_Wool-Slipper-Fluff-Natural-White-Natural-White-Sole_PDP_LEFT.png?v=1759335576&width=1600",
    url: "/products/allbirds-slipper-natural-white-fluff",
  },
  {
    id: "7211506532432",
    title: "Wool Cruiser",
    description: "Light Tan (Natural White Sole)",
    price: "$70",
    compareAtPrice: "$100",
    image:
      "https://www.allbirds.com/cdn/shop/files/A11703_25Q3_Wool-Cruiser-Light-Tan-Natural-White-Sole_PDP_LEFT__1.png?v=1756337203&width=1600",
    url: "/products/womens-wool-cruiser",
  },
];

export default function BestSellersSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftCursor, setShowLeftCursor] = useState(false);
  const [showRightCursor, setShowRightCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const swiperRef = useRef<SwiperType | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null); // <--- added

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // <--- Added: hide custom cursor if carousel scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const rect = carouselRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) {
        setShowLeftCursor(false);
        setShowRightCursor(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start lg:items-center justify-center gap-2 ml-2 lg:ml-0 mt-20 font-semibold">
      <p className="underline tracking-widest">BESTSELLERS</p>

      {/* Swiper Carousel */}
      <div
        className="w-full lg:min-h-24 lg:max-h-2/3 mx-auto relative"
        ref={carouselRef} // <--- attach the ref here
      >
        <DotsOverlay>
          <Swiper
          modules={[ Navigation]}
          navigation={window.innerWidth < 768}
            centeredSlides={true}
            slidesPerView={2}
            slideToClickedSlide={true}
            loop={true}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 2 },
              480: { slidesPerView: 1.6, spaceBetween: 15 },
              768: { slidesPerView: 1.5, spaceBetween: 25 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
              1440: { slidesPerView: 2, spaceBetween: 30 },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <div className="block aspect-square lg:ml-9 w-[70vw] md:w-[550px] lg:w-[750px] rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </DotsOverlay>

        {/* Click areas */}
        <div
          onClick={() => swiperRef.current?.slidePrev()}
          onMouseEnter={() => setShowLeftCursor(true)}
          onMouseLeave={() => setShowLeftCursor(false)}
          onMouseMove={handleMouseMove}
          className="absolute left-0 top-0 h-[75%] w-1/2 z-10 lg:cursor-none"
        ></div>

        <div
          onClick={() => swiperRef.current?.slideNext()}
          onMouseEnter={() => setShowRightCursor(true)}
          onMouseLeave={() => setShowRightCursor(false)}
          onMouseMove={handleMouseMove}
          className="absolute right-0 top-0 h-[75%] w-1/2 z-10 lg:cursor-none"
        ></div>

        {/* Custom Cursor — ONLY on large screens */}
        {(showLeftCursor || showRightCursor) && (
          <div
            className="fixed w-30 h-30 rounded-full border border-black backdrop-blur-md bg-white/30 pointer-events-none z-20 hidden lg:flex items-center justify-center"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-black mb-1 text-4xl">
              {showLeftCursor ? "←" : "→"}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-center gap-4 mx-auto lg:-mt-25 text-center">
        <h3 className="font-serif text-4xl md:text-3xl">
          {products[activeIndex].title}
        </h3>
        <div className="flex gap-2 ">
          <p className="text-xs md:text-base">
            {products[activeIndex].description + " - "}
          </p>
          <div className="flex items-center flex-row gap-2">
            <span className="text-red-600 font-medium tracking-widest uppercase">
              {products[activeIndex].price}
            </span>
            <span className="line-through opacity-60">
              {products[activeIndex].compareAtPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mx-auto mt-3">
        <Link to="/men" className="py-1 px-4 text-sm border border-black rounded-3xl hover:bg-gray-900 hover:text-white transition-colors duration-300">
          SHOP MEN
        </Link>
        <Link to="/women" className="py-1 px-4 text-sm border border-black rounded-3xl hover:bg-gray-900 hover:text-white transition-colors duration-300">
          SHOP WOMEN
        </Link>
      </div>
    </div>
  );
}

function DotsOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 w-[50%] h-[60%] left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2 bg-[url('/freepik__background__19287.png')] bg-cover pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 70%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      {children}
    </div>
  );
}
