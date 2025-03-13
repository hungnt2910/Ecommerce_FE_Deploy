import React, { useState } from "react";
import { ImageGrid } from "../common/ImageGrid";

export const ProductDescription = () => {
  const [showFullText, setShowFullText] = useState(false);

  const description1 =
    "The 20L model has enough space for 370 candy bars, 6 cylinders of chips, 1220 standard gumballs, or any combination of on-the-go treats that your heart desires. Yes, we did the math.";
  const description2 =
    "Up your snack organization game with multiple compartment options. The quick-access stash pouch is ready for even the most unexpected snack attacks and sharing needs.";

  const truncateText = (text) => {
    return text.length > 300 && !showFullText
      ? text.substring(0, 300) + "..."
      : text;
  };

  return (
    <>
      <ImageGrid />
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto flex flex-col justify-center items-start text-start">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-start">
            The Fine Details
          </h2>
          <p className="text-gray-600 mt-2">
            Our patented padded snack sleeve construction protects your favorite
            treats from getting smooshed during all-day adventures, long shifts
            at work, and tough travel schedules.
          </p>
        </div>

        {/* Image & Description Section */}
        <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-8 max-w-5xl mx-auto">
          {/* Left Image & Text */}
          <div className=" flex flex-col items-center lg:items-start">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg"
              alt="Detail 1"
              className="w-full max-w-md rounded-lg"
            />
            <p className="text-gray-600 mt-4 text-center lg:text-left w-full max-w-md">
              {truncateText(description1)}
            </p>
          </div>

          {/* Right Image & Text */}
          <div className="flex flex-col items-center lg:items-start">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg"
              alt="Detail 2"
              className="w-full max-w-md rounded-lg"
            />
            <p className="text-gray-600 mt-4 text-center lg:text-left w-full max-w-md">
              {truncateText(description2)}
            </p>
          </div>
        </div>

        {/* "See More" Button */}
        {(description1.length > 300 || description2.length > 300) && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-600 hover:underline font-medium"
            >
              {showFullText ? "Collapse" : "See More"}
            </button>
          </div>
        )}
      </section>
    </>
  );
};
