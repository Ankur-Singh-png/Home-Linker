import React from 'react';
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from 'react-icons/md';
import { CgRuler } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Item = ({ property }) => {
  return (
    <div className="rounded-2xl bg-white shadow-md p-4 flex flex-col h-full transition-transform hover:scale-[1.02] duration-300">
      {/* Image Container */}
      <div className="w-full h-60 overflow-hidden rounded-xl mb-4">
        <img
          src={property.imageURL}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & City */}
      <div className="mb-2">
        <p className="text-sm text-green-600 font-semibold">{property.city}</p>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
      </div>

      {/* Property Info */}
      <div className="flex gap-x-3 text-gray-700 text-sm font-medium mb-3">
        <div className="flex items-center gap-x-1 border-r pr-3"><MdOutlineBed />{property.bedrooms}</div>
        <div className="flex items-center gap-x-1 border-r pr-3"><MdOutlineBathtub />{property.bathrooms}</div>
        <div className="flex items-center gap-x-1 border-r pr-3"><MdOutlineGarage />{property.halls}</div>
        <div className="flex items-center gap-x-1"><CgRuler />400</div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

      {/* Footer: Price & Button */}
      <div className="mt-auto flex justify-between items-center">
        <p className="text-lg font-semibold text-black">
          ₹{property.price}
        </p>
        <Link to={`/details/${property.id}`}>
          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Item;