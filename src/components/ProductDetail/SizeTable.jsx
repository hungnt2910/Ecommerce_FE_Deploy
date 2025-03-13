import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";

const SizeTable = ({ sizes, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white p-5 flex flex-col gap-2 rounded shadow-lg h-9/12 w-11/12 md:w-7/12 lg:w-6/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg font-semibold flex text-[#464646] items-center justify-between">
          <h2 className="">Size Conversion Table</h2>
          <button className="text-2xl cursor-pointer" onClick={onClose}>
            <LiaTimesSolid />
          </button>
        </div>
        <div className="text-sm">
          <p>Size Conversion Table</p>
          <p className="text-[#757575]">
            Parameters in this size conversion table are provided by the seller
            and may be 1-2 cm difference compared to reality.
          </p>
        </div>
        <table className="w-full border-collapse border mt-2 text-base">
          <thead>
            <tr>
              <th className="w-1/3 border p-2">Size (international)</th>
              <th className="w-1/3 border p-2">Width (cm)</th>
              <th className="w-1/3 border p-2">Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            {sizes &&
              sizes.map((item, index) => (
                <tr className="w-1/3 text-sm" key={index}>
                  <td className="text-center border p-2">{item.size}</td>
                  <td className="text-center border p-2">{item.width}</td>
                  <td className="text-center border p-2">{item.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeTable;
