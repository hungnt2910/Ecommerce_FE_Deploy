import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ModelSizeInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left"  ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2 rounded-md shadow-md flex items-center gap-2 
        text-sm md:text-xs lg:text-sm transition-all duration-200"
      >
        <span className="hidden md:inline">Model is wearing sizes M and S.</span>
        <span className="md:hidden">Model Size</span>
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>

      {/* Dropdown Content - Fixed Position */}
      {isOpen && (
        <div
          className="absolute top-full  w-48 md:w-60 bg-white shadow-lg rounded-md border 
          p-3 md:p-4 text-sm md:text-xs lg:text-sm z-50"
        >
          <p className="text-gray-400 font-semibold mb-2 text-xs md:text-[11px] lg:text-xs">
            Model size
          </p>
          <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-xs md:text-[11px] lg:text-sm">
            <span>Height</span> <span className="text-right">174 cm / 70"</span>
            <span>Bust</span> <span className="text-right">77 cm / 30"</span>
            <span>Waist</span> <span className="text-right">60 cm / 24"</span>
            <span>Hips</span> <span className="text-right">90 cm / 35"</span>
            <span>Top / Bottom</span> <span className="text-right">M / S</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSizeInfo;
