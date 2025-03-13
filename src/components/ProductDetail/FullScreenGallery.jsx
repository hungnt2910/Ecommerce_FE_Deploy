import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
} from "react-icons/fa";

// const images = [
//   "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
//   "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
//   "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
//   "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
//   "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
// ];

export const FullScreenGallery = ({ currentIndexs, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(currentIndexs);

  console.log(currentIndexs);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button className="absolute top-4 right-4 text-white" onClick={onClose}>
        <FaTimes size={32} />
      </button>

      <button className="absolute left-4 text-white p-2" onClick={prevImage}>
        <FaChevronLeft size={40} />
      </button>

      <div className="flex flex-col-reverse sm:flex-row lg:flex-row-reverse justify-center items-center gap-4 p-4">
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[100px] sm:max-h-[400px]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`w-24 h-24 rounded cursor-pointer ${
                index === currentIndex ? "border-4 border-white" : "opacity-50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        {/* Main Image */}
        <img
          src={images[currentIndex]}
          alt="Gallery Item"
          className="max-h-[80vh] w-auto rounded-lg"
        />
      </div>

      <button className="absolute right-4 text-white p-2" onClick={nextImage}>
        <FaChevronRight size={40} />
      </button>
    </div>
  );
};
