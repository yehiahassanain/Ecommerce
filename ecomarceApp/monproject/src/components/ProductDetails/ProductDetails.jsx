import React, { useState, useEffect } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ProductDetails() {
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  const [productDetails, setProductDetails] = React.useState(null);
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  let { id } = useParams();
  let { category } = useParams();
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log("Response : ", data.data);
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }

  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log("Response : ", data.data);
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name === category && product.id !== id,
        );
        console.log("Related : ", related);
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  }, [id, category]);
  return (
    <>
      <div className="row">
        <div className="w-1/4 container-slider">
          {/* <Slider {...settings}>/ */}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1} // Change to 1 if you want one image at a time
            navigation
          >
            {productDetails?.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="w-full h-auto object-cover"
                  src={image}
                  alt={`${productDetails?.title} - ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* </Slider> */}
          {/* <img className='w-full' src={productDetails?.imageCover} alt={productDetails?.title} /> */}
        </div>
        <div className="w-3/4 p-6">
          <h2 className="text-2xl font-bold mb-4">{productDetails?.title}</h2>
          <p className="text-gray-700 font-light mb-4">
            {productDetails?.description}
          </p>
          <div className="mb-4">
            <span className="text-lg font-bold text-gray-900 mr-4">
              {productDetails?.price} EGP
            </span>
            <span>
              {productDetails?.ratingsAverage}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button className="btn px-4 py-2 w-full rounded-lg text-white bg-green-600 cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="row">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={1}
          slidesPerView={6} // Change to 1 if you want one image at a time
          navigation
        >
          {relatedProducts.map((product) => (
            <SwiperSlide>
              <div className="product px-4" key={product.id}>
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} alt={product.title} />
                  <h3 className="font-light text-green-600">
                    {product.category.name}
                  </h3>
                  <p className="text-lg font-normal text-gray-800 mb-4">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <div className="mb-4">
                    <span className="text-lg font-bold text-gray-900 mr-4">
                      {product.price} EGP
                    </span>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                  <button className="btn px-4 py-2 w-full rounded-lg text-white bg-green-600">
                    Add to Cart
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
