import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import BannerItem from "./BannerItem";
import { useRef } from "react";
import { getAds } from "../../services/adsService";

const Banner = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let intervalRef = useRef(null);

  useEffect(() => {
    const fetchAds = async () => {
      const data = await getAds();
      setAds(data);
      setIsLoading(true);
    };
    fetchAds();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ads.slice(0, 4).length - 1 ? 0 : prevIndex + 1
    );
    resetInterval();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ads.slice(0, 4).length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    resetInterval();

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, ads]);

  return (
    <div className="mt-15 md:mt-15 relative overflow-hidden rounded-2xl lg:mt-5">
      {isLoading && (
        <>
          <div
            className="flex h-60 lg:h-auto transition-transform duration-500 ease-in-out w-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {ads.length > 0 &&
              ads
                .slice(0, 4)
                .map((ad, index) => (
                  <BannerItem
                    key={index}
                    index={index}
                    image={ad.image}
                    title={ad.title}
                    discount={ad.discountInfo}
                  />
                ))}
          </div>

          {/* Nút điều hướng trái */}
          <button
            onClick={prevSlide}
            className="absolute left-4 cursor-pointer md:left-10 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 md:p-3 rounded-full hover:bg-white/50 transition-all"
          >
            <FaChevronLeft className="text-white text-lg md:text-2xl" />
          </button>

          {/* Nút điều hướng phải */}
          <button
            onClick={nextSlide}
            className="absolute right-4 cursor-pointer md:right-10 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 md:p-3 rounded-full hover:bg-white/50 transition-all"
          >
            <FaChevronRight className="text-white text-lg md:text-2xl" />
          </button>

          {/* Chấm điều hướng */}
          <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 md:left-[20%] lg:left-[10%] md:translate-x-0 flex gap-2">
            {ads.slice(0, 4).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
