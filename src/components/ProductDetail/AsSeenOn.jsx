import React, { useEffect } from "react";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchArticle } from "../../redux/slices/productDetailSlice";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-10 bg-white shadow-lg rounded-full p-1 hover:scale-110 transition-transform text-gray-900 cursor-pointer" 
      style={{ top: "50%", transform: "translateY(-50%)", fontSize: "24px" }}
    >
      <BiChevronLeft size={28} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-10 bg-white shadow-lg rounded-full p-1 hover:scale-110 transition-transform text-gray-900 cursor-pointer"
      style={{ top: "50%", transform: "translateY(-50%)", fontSize: "24px" }}
    >
      <BiChevronLeft size={28} />
    </button>
  );
};

const AsSeenOn = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesToShow = 3;
    const dispatch = useDispatch()
    const { article } = useSelector((state) => state.productDetails || {});
    const totalSlides = article.length

    
    useEffect(() => {
      dispatch(fetchArticle())
    }, [dispatch])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Shows prev/next arrows
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    prevArrow: currentSlide > 0 ? <CustomPrevArrow /> : null,
    nextArrow: currentSlide < totalSlides - slidesToShow ? <CustomNextArrow /> : null,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="w-full py-12 mt-10">
      <h2 className="text-center text-2xl font-bold mb-8">As seen on</h2>
      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {article.map((logo, idx) => (
            <div key={idx} className="p-4">
              <a
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white shadow-[0_5px_10px_rgba(0,0,0,0.2)] rounded-xl p-6 h-40"
              >
                <img
                  src={logo.logo}
                  alt={logo.title}
                  className="max-h-24 w-auto object-contain"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AsSeenOn;
