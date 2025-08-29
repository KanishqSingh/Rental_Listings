import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="max-w-full md:h-60 bg-gradient-to-r from-blue-950 to-amber-950 text-white py-12 px-6 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-18 md:mt-10">

      {/* Text Content */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Do you wanna rent your Property?
        </h2>
        <p className="text-sm sm:text-base mb-3 text-gray-200">
          Monetize your car — let it earn when you're not driving. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique magni, placeat totam neque dignissimos.
        </p>

        <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          List Your Property
        </button>
      </div>

      {/* Car Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={assets.animatedhouse1}
          alt="Luxury property"
          className="w-full  md:ml-30 md:mb-45 max-w-lg object-contain"
        />
      </div>

    </div>
  );
};

export default Banner;
