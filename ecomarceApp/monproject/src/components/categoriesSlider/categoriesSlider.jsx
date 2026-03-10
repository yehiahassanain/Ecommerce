import React, { useState, useEffect } from "react";
import Style from "./CategoriesSlider.module.css";
import axios from "axios";
// Import Swiper React components
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function CategoriesSlider() {
  const [categories, setCategories] = React.useState([]);
  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        console.log("Response : ", data.data);
        setCategories(data.data);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>
      <div>
        <h3 className="py-5 text-gray-800 text-lg font-light">
          Shop Popular Categories
        </h3>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={1}
          slidesPerView={8} // Change to 1 if you want one image at a time
          navigation
          Autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {categories?.map((category) => (
            <SwiperSlide key={category.id}>
              <img
                className="w-full h-50 object-cover"
                src={category.image}
                alt={`${category.name}`}
              />
              <h3 className="text-center py-2">{category.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
