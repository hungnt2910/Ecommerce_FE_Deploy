import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BannerItem = ({ index, image, title, discount }) => {
  const nav = useNavigate();
  return (
    <div
      key={index}
      className="w-full h-full flex-shrink-0 relative cursor-pointer"
      onClick={() => nav("/white-page")}
    >
      <img
        className="h-full md:h-[300px] w-full object-cover lg:h-[500px]"
        src={image}
        alt={title}
      />
      <div className="absolute w-full lg:w-1/2 text-white top-[30%] left-[20%] md:top-[15%] lg:left-[10%] lg:top-[30%] flex flex-col gap-4 lg:gap-8">
        <h4 className="text-base lg:text-4xl w-full font-semibold">{title}</h4>
        <span className="block text-lg lg:text-5xl font-semibold">
          {" "}
          {discount}
        </span>
        <button
          className="h-10 w-1/2 md:w-1/3 lg:w-[50%] text-xs lg:text-lg cursor-pointer flex items-center justify-center gap-2 bg-white text-black px-6 py-4 lg:py-5 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            nav("/white-page");
          }}
        >
          <FaCartShopping />
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
