import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import Title from '../Components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const { axios, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      console.log("data in booking -- ", data);

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 max-w-7xl mx-auto text-sm text-gray-800'>
      <Title
        title='My Bookings'
        subTitle='View and manage all your property bookings'
        align='left'
      />

      <div className='mt-10 space-y-6'>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
            // Normalize data
            const property = booking.property || booking.car || {};
            const start = booking.pickupDate || booking.startDate;
            const end = booking.returnDate;
            const status = booking.status || "pending";

            return (
              <div
                key={booking._id || index}
                className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300'
              >
                {/* Property Image */}
                <div className='md:col-span-1'>
                  <img
                    src={property.image}
                    alt={property.type || "Property"}
                    className='w-full aspect-video object-cover rounded-lg'
                  />
                </div>

                {/* Property Info */}
                <div className='md:col-span-2 flex flex-col justify-between'>
                  <div>
                    <h2 className='text-xl font-semibold'>
                      {property.type || "Property"}
                    </h2>
                    <p className='text-gray-500 mt-1'>
                      {property.year} • {property.description} • {property.location}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start gap-4 mt-6 text-xs sm:text-sm">
                    {/* Booking Number */}
                    <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full'>
                      Booking #{index + 1}
                    </span>

                    {/* Booking Status */}
                    <span
                      className={`px-3 py-1 rounded-full ${
                        status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {status}
                    </span>

                    {/* Rental Dates */}
                    <div className='flex items-start gap-2'>
                      <img src={assets.calendar_icon_colored} alt="calendar" className='w-4 h-4 mt-1' />
                      <div>
                        <p className='text-gray-500'>Rental Period</p>
                        <p>
                          {start?.split('T')[0]} to {end?.split('T')[0]}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className='flex items-start gap-2'>
                      <img src={assets.location_icon_colored} alt="location" className='w-4 h-4 mt-1' />
                      <div>
                        <p className='text-gray-500'>Location</p>
                        <p>{property.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className='md:col-span-1 flex flex-col justify-between gap-6 text-right md:text-left'>
                  <div>
                    <p className='text-gray-500'>Total Price</p>
                    <h1 className='text-2xl font-semibold text-blue-600'>${booking.price}</h1>
                    <p className='text-sm text-gray-400 mt-2'>
                      Booked on {booking.createdAt.split('T')[0]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-gray-500 mt-10'>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
