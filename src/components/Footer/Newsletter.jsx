import React from "react";
import { Button } from "../Button";

export const Newsletter = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 md:px-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left Side - Text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 text-sm">
            Subscribe to our newsletter and get 10% off your first purchase
          </p>
        </div>

        {/* Right Side - Input Field */}
        <div className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full md:w-80 border rounded-l-md focus:outline-none"
          />
          <Button style={"bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition"} content={"SUBSCRIBE"}/>
        </div>
      </div>
    </div>
  );
};
