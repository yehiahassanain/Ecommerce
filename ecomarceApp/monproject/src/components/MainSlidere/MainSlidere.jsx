import React, { useState, useEffect } from "react";
import Style from "./MainSlidere.module.css";
import slide from "../../assets/images/slider-image-1.jpeg";
import slide1 from "../../assets/images/slider-image-2.jpeg";
import MainSlider from "../../assets/images/slider-image-3.jpeg";
import MainSlider1 from "../../assets/images/grocery-banner-2.jpeg";
import MainSlider2 from "../../assets/images/grocery-banner.png";
// Import Swiper React components
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainSlidere() {
  const [counter, setCounter] = React.useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Autoplay,
              EffectCards,
            ]}
            spaceBetween={50}
            slidesPerView={1} // Change to 1 if you want one image at a time
            navigation
            effect={"cards"}
            grabCursor={true}
            className="mySwiper"
            Autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <img
                className="w-full h-[400px]"
                src={MainSlider}
                alt="Main Slider"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-[400px]"
                src={MainSlider1}
                alt="Main Slider"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                className="w-full h-[400px]"
                src={MainSlider2}
                alt="Main Slider"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <img className="w-full h-[200px]" src={slide} alt="Main Slider 1" />
          <img className="w-full h-[200px]" src={slide1} alt="Main Slider 2" />
        </div>
      </div>
    </>
  );
}
