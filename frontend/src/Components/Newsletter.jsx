import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-blue-950 p-8  mt-16 mb-16 px-4 w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl space-y-4">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
          Never Miss a Deal!
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>

        <form className="flex w-full max-w-xl h-12 sm:h-13 text-white">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 border text-white border-gray-300 rounded-l-md px-4 text-sm outline-none focus:ring-2 focus:ring-amber-950"
          />
          <button
            type="submit"
            className="px-6 sm:px-10 bg-rose-900 hover:bg-amber-950 text-white font-medium rounded-r-md transition duration-200"
          >
            Subscribe
          </button>
        </form>

      </div>
    </div>
  );
};

export default Newsletter;
