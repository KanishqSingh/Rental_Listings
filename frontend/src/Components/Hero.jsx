import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const [location, setLocation] = useState('');
  const { navigate, startDate, setStartDate, returnDate, setReturnDate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/properties?location=${location}&startDate=${startDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-20 text-center m-4  shadow-lg shadow-amber-950"
      style={{ backgroundImage: `url(${assets.heroBanner1})`, backgroundSize: "cover", backgroundPosition: "center", }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content on top of overlay */}
      <div className="relative z-10 flex flex-col gap-12 items-center w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Luxury Properties on Rent
        </h1>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-5xl bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-end justify-between"
        >
          {/* Pickup Location */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 min-h-[90px]">
            <label htmlFor="pickup-location" className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="pickup-location"
              required
              type="text"
              placeholder="Enter City or Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <p className="text-xs text-gray-500 h-4">
              {location ? `Selected: ${location}` : ' '}
            </p>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 min-h-[90px]">
            <label htmlFor="pickup-date" className="text-sm font-medium text-gray-700">
              Rent Start Date
            </label>
            <input
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 min-h-[90px]">
            <label htmlFor="return-date" className="text-sm font-medium text-gray-700">
              Rent Return Date
            </label>
            <input
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto min-h-[90px] flex justify-center md:justify-end items-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition duration-200 shadow-md"
            >
              <img src={assets.search_icon} alt="search" className="w-4 h-4 filter brightness-200" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
