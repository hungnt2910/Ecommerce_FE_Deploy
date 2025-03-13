import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ProductCard } from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ListProduct = ({ title, productList }) => {
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  // console.log(productList)

  // Disable prev/next buttons when at the first or last slide
  const totalSlides = productList.length;

  function getSlidesToShow() {
    if (window.innerWidth < 480) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  }

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  // Slider settings
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: slidesToShow, // Default for large screens
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <div className="w-full px-4 py-6 sm:pt-15 sm:pb-5 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <div className="flex gap-4">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition 
        ${currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentSlide === 0}
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition 
        ${
          currentSlide >= totalSlides - slidesToShow
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
            disabled={currentSlide >= totalSlides - slidesToShow}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {productList.map((product) => (
            <div key={product.id} className="px-5">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
