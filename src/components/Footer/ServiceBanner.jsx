import React from "react";
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaTruck className="text-4xl text-gray-700" />,
    title: "FREE DELIVERY",
    description: "For all order over $120",
  },
  {
    id: 2,
    icon: <FaUndo className="text-4xl text-gray-700" />,
    title: "14 DAYS RETURN",
    description: "If goods have problems",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-4xl text-gray-700" />,
    title: "SECURE PAYMENT",
    description: "100% Secure payment",
  },
  {
    id: 4,
    icon: <FaHeadset className="text-4xl text-gray-700" />,
    title: "24/7 SUPPORT",
    description: "Dedicated support",
  },
];

export const ServiceBanner = () => {
  return (
    <div className="py-6 px-4 md:px-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center md:text-left">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-3">
            {service.icon}
            <div className="mt-2 md:mt-0">
              <p className="font-semibold text-gray-900">{service.title}</p>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
