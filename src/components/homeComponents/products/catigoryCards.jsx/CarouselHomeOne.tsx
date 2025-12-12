"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // <-- added

interface CarouselItem {
  id: number;
  img: string;
  title: string;
}

const items: CarouselItem[] = [
  { id: 1, img: "/gift.webp", title: "Gifts Under $100" },
  { id: 2, img: "/men.webp", title: "Mens" },
  { id: 3, img: "/women.webp", title: "Womens" },
  { id: 4, img: "/best.jpg", title: "Bestsellers" }
];

export default function CarouselHomeOne() {
  const [selected, setSelected] = useState(0);

  const pVariants = {
    default: { borderColor: "rgba(255,255,255,1)" },
    active: { borderColor: "rgba(255,255,255,0)" }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    default: { clipPath: "inset(0 round 16px)" },
    active: { clipPath: "inset(0 round 9999px)" }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-5">
      {/* Desktop */}
      <div className="hidden lg:flex justify-center gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            onMouseEnter={() => setSelected(item.id)}
            onMouseLeave={() => setSelected(0)}
            variants={cardVariants}
            animate={selected === item.id ? "active" : "default"}
            transition={{  duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden shadow-lg w-full min-w-[380px] max-w-[550px] min-h-[500px] max-h-[600px] bg-gray-200 relative will-change-[clip-path]"
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
              <motion.p
                className="text-center font-semibold text-white px-4 py-1 rounded-full border border-white"
                variants={pVariants}
                animate={selected === item.id ? "active" : "default"}
                transition={{ duration: 0.5 }}
              >
                {item.title}
              </motion.p>
              <motion.div
                className="flex flex-col gap-2"
                variants={buttonVariants}
                initial="hidden"
                animate={selected === item.id ? "visible" : "hidden"}
                transition={{ duration: 0.5 }}
              >
                {selected === item.id && selected !== 3 && (
                  <Link
                    to="/men"
                    className="text-white border hover:text-black hover:bg-white flex items-center justify-center transition-colors duration-200 border-white rounded-full py-1 px-2"
                  >
                    SHOP MEN
                  </Link>
                )}
                {selected === item.id && selected !== 2 && (
                  <Link
                    to="/women"
                    className="text-white border hover:text-black hover:bg-white flex items-center justify-center transition-colors duration-200 border-white rounded-full py-1 px-2"
                  >
                    SHOP WOMEN
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile & Tablet */}
      <div className="lg:hidden">
        <Swiper
          centeredSlides
          slidesPerView={1.5}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 5 },
            1024: { slidesPerView: 1.5, spaceBetween: 10 }
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => setSelected(swiper.realIndex + 1)}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                className="overflow-hidden shadow-lg min-w-[250px] max-w-[400px] min-h-[350px] max-h-[500px] mx-auto bg-gray-200 relative will-change-[clip-path]"
                variants={cardVariants}
                animate={selected === item.id ? "active" : "default"}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
                  <motion.p
                    className="text-center text-sm font-semibold border-white border text-white px-4 py-1 rounded-full"
                    variants={pVariants}
                    animate={selected === item.id ? "active" : "default"}
                    transition={{ duration: 0.5 }}
                  >
                    {item.title}
                  </motion.p>
                  <motion.div
                    className="flex gap-2"
                    variants={buttonVariants}
                    initial="hidden"
                    animate={selected === item.id ? "visible" : "hidden"}
                    transition={{ duration: 0.5 }}
                  >
                    {selected === item.id && (
                      <div className="flex flex-col gap-2">
                        {selected !== 3 && (
                          <Link
                            to="/men"
                            className="text-white border flex items-center justify-center border-white rounded-full py-1 px-2"
                          >
                            SHOP MEN
                          </Link>
                        )}
                        {selected !== 2 && (
                          <Link
                            to="/women"
                            className="text-white border flex items-center justify-center border-white rounded-full py-1 px-2"
                          >
                            SHOP WOMEN
                          </Link>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
