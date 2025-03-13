import React from "react";

export const ImageGrid = () => {
  return (
    <div className="w-full mx-auto mt-10">
      <div className="grid grid-cols-2 gap-4">
        {/* Top Image - Spans 2 Columns */}
        <img
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-06-detail-01.jpg"
          alt="Top Image"
          className="w-full h-full object-cover rounded-lg col-span-2"
        />

        {/* Bottom Left Image */}
        <img
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-07-detail-01.jpg"
          alt="Bottom Left"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Bottom Right Image */}
        <img
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-07-detail-02.jpg"
          alt="Bottom Right"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

