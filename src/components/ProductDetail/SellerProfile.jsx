import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShopInfomation } from "../../redux/slices/productDetailSlice";

const sellerData = {
  logo: "https://down-vn.img.susercontent.com/file/23a7300695934c18cea715a64bdd0e16@resize_w160_nl.webp", // Replace with real logo
  name: "Ruze Shoes",
  positiveFeedback: 98.4,
  itemsSold: "674K",
  description:
    "Ruze Shoes was born and raised in Southern California. As a leading Internet shoe retailer, we provide 100% authentic footwear at competitive prices.",
  totalFeedbacks: "229,365",
};

const feedbackData = [
  {
    username: "Alex",
    timeAgo: "Past month",
    comment: "Padding needs to be thicker and needs more support.",
  },
  {
    username: "Chris",
    timeAgo: "Past 6 months",
    comment: "Exactly what I wanted! Good price, good service and really fast!",
  },
  {
    username: "Tommy",
    timeAgo: "Past 6 months",
    comment: "Great seller!",
  },
  { username: "Shara", timeAgo: "Past 6 months", comment: "Nice" },
];

export const SellerProfile = ({ shopId }) => {
  const [isFollow, setIsFollow] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { shopInfomation } = useSelector((state) => state.productDetails || {});

  useEffect(() => {
    if (shopId) {
      dispatch(fetchShopInfomation(shopId));
    }
  }, [dispatch, shopId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-full flex flex-col md:flex-row gap-6 mt-10">
      {/* Left: Seller Info */}
      <div className="md:w-1/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4">
            <img
              src={shopInfomation.logo}
              alt={shopInfomation.name}
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold">{shopInfomation.name}</h2>
              <p className="text-sm text-gray-600">
                {shopInfomation.followers} followers • {sellerData.itemsSold}{" "}
                items sold
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {shopInfomation.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 space-y-2">
          <button
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              nav("/white-page");
            }}
          >
            Visit store
          </button>
          {!isFollow ? (
            <>
              <button
                className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              >
                Follow
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              >
                Followed
              </button>
            </>
          )}
          <button className="w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
            Chat
          </button>
        </div>
      </div>

      {/* Right: Seller Feedback */}
      <div className="md:w-2/3">
        <h3 className="text-lg md:text-xl font-semibold flex flex-wrap items-center">
          Feedback
          <div className="flex flex-wrap items-center ml-3 md:ml-3 text-orange-500">
            <FaStar size={14} className="md:size-5" fill="currentColor" />
            <span className="ml-1 text-sm md:text-base font-medium text-gray-700">
              {shopInfomation.rating} |
            </span>
            <div className="ml-2 px-1 py-0.5 bg-gray-200 rounded text-[10px] md:text-xs font-medium text-gray-700">
              2222 Sold
            </div>
          </div>
        </h3>

        {/* Feedback List */}
        <div className="mt-3">
          {feedbackData.map((feedback, index) => (
            <div key={index} className="border-b py-3 text-sm">
              <p className="text-gray-700">
                <span className="text-gray-800 font-semibold">
                  {feedback.username}
                </span>{" "}
                • <span className="text-gray-500">{feedback.timeAgo}</span>
              </p>
              <p className="text-gray-800 mt-1">{feedback.comment}</p>
              <p className="text-gray-500 text-xs mt-1">Verified purchase</p>
            </div>
          ))}
        </div>

        <button className="mt-3 text-black font-semibold cursor-pointer hover:underline">
          See all feedback
        </button>
      </div>
    </div>
  );
};
