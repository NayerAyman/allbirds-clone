import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Controller,
} from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TwoSliders() {
  // Products array
  const products = [
    {
      id: 1,
      name: "Wool Cruiser Forest Green",
      description:
        "Step into cozy sophistication with Forest Green Wool Cruisers — perfect for every casual adventure.",
      leftImage:
        "/A11693_25Q3_Wool-Cruiser-Forest-Green-Natural-White-Sole_PDP_LEFT__1_dd771e7b-9bb1-4397-a2f8-6ff87359fa1a.webp",
      rightImage:
        "/25Q4_Holiday_Batch2_Site_InspirationCarousel_Men_Desktop-Mobile_2x3_WoolCruiser.webp",
    },
    {
      id: 2,
      name: "Wool Cruiser Dark Grey",
      description:
        "Dark Grey Wool Cruisers combine timeless style with the soft comfort of premium merino wool.",
      leftImage:
        "/A11636_25Q3_Wool-Cruiser-Slip-On-Dark-Grey-Light-Grey-Sole_PDP_LEFT__1_056967a9-8421-46db-a3ed-cae6cdae557a.webp",
      rightImage:
        "/25Q4_Holiday_Batch2_Site_InspirationCarousel_Women_Desktop-Mobile_2x3_WoolCruiser.webp",
    },
    {
      id: 3,
      name: "Runner NZ Dark Tan",
      description:
        "Dark Tan Runner NZ delivers unmatched lightweight comfort for long walks and urban adventures.",
      leftImage:
        "/A11946_25Q3_Runner-NZ-Corduroy-Dark-Tan-Stony-Cream-Sole_PDP_LEFT__1_b3652293-ff71-4f11-acf5-40211d791973.webp",
      rightImage:
        "/25Q4_Holiday_Batch2_Site_InspirationCarousel_Mens_Desktop-Mobile_2x3_CordNZ.webp",
    },
  ];

  const swiper1Ref = useRef<SwiperInstance | null>(null);
  const swiper2Ref = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiper1Ref.current && swiper2Ref.current) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
      swiper2Ref.current.controller.control = swiper1Ref.current;
    }
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-center w-full h-dvh gap-3 lg:gap-10 lg:flex-row">
      {/* LEFT SLIDER */}
      <div className="lg:w-[45%] w-[90%] h-[45dvh] lg:h-[92dvh] rounded-3xl flex flex-col justify-start items-center gap-1 p-4">
        {/* Top text */}
        <p className="text-xs text-center ">CONFERT BY NATURE</p>

        {/* Swiper fills the available space */}
        <div className="w-full h-[50%] flex-1">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            modules={[Autoplay, Pagination, Navigation, EffectFade, Controller]}
            className="w-full h-full"
            onSwiper={(swiper) => {
              swiper1Ref.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <DotsOverlay>
                <img
                  className="w-full h-full relative z-10 object-cover rounded-3xl"
                  src={product.leftImage}
                  alt={product.name}
                  />
                  </DotsOverlay>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Bottom text */}
        <div className="flex items-center justify-center flex-col gap-1">
          <h1 className="text-2xl font-semibold">
            {products[activeIndex].name}
          </h1>
          <p className="text-center text-sm">
            {products[activeIndex].description}
          </p>
          <div className="flex gap-2 mt-6">
            <Link to="men" className="border border-black flex items-center justify-center rounded-3xl py-1 px-5 text-sm font-semibold hover:bg-gray-950 hover:text-white duration-200">
              SHOP MEN
            </Link>
            <Link to="women" className="border border-black flex items-center justify-center rounded-3xl py-1 px-5 text-sm font-semibold hover:bg-gray-950 hover:text-white duration-200">
              SHOP MEN
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SLIDER */}
      <div className="lg:w-[45%] w-[90%] h-[45dvh] lg:h-[92dvh] rounded-3xl flex justify-center items-start overflow-hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, Pagination, Navigation, EffectFade, Controller]}
          className="w-full h-full"
          onSwiper={(swiper) => {
            swiper2Ref.current = swiper;
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <img
                className="w-full h-full object-cover lg:mb-7"
                src={product.rightImage}
                alt={product.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


function DotsOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      {/* Background overlay behind children */}
      <div
        className="absolute inset-0 w-[70%] h-full z-0 mx-auto bg-[url('/freepik__background__19287.png')] bg-cover pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle, #00000048 40%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, #0000003c 30%, rgba(0,0,0,0) 70%)",
        }}
      />
      {/* Children (image) will naturally be above overlay */}
      {children}</div>

  );
}

