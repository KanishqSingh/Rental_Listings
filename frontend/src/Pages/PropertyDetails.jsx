import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { assets } from '../assets/assets.js';
import Loader from '../Components/Loader.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const {properties,axios,startDate,setStartDate,
        returnDate,setReturnDate} = useAppContext();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/bookings/create',{
        property:id,
        startDate,
        returnDate
      })

      if(data.success){
        toast.success(data.message);
        navigate('/my-bookings')
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  }

  useEffect(() => {
    setProperty(properties.find((p) => p._id === id));
  }, [properties,id]);

  return property ? (
    <div className='px-6 mb-15 md:px-16 lg:px-24 xl:px-32 mt-20 text-gray-800 font-sans'>
      {/* Back Button */}
      <button
        className='flex items-center gap-2 mb-8 text-gray-600 hover:text-black transition-colors'
        onClick={() => navigate(-1)}
      >
        <img
          src={assets.arrow_icon}
          alt=''
          className='rotate-180 opacity-65 w-4 h-4'
        />
        <span className='text-sm'>Back to all properties</span>
      </button>

      {/* Grid Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Car Info Section */}
        <div className='lg:col-span-2'>
          <img
            src={property.image}
            alt=''
            className='w-full h-auto max-h-[400px] object-cover rounded-2xl mb-6 shadow-lg'
          />

          <div className='space-y-8'>
            {/* Title */}
            <div>
              <h1 className='text-4xl font-extrabold tracking-tight'>
                {property.type}
              </h1>
              <p className='text-lg text-gray-500 mt-1'>
                {property.year}
              </p>
            </div>

            <hr className='border-gray-300' />

            {/* Key Info */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {
                  icon: assets.users_icon,
                  text: `${property.population_capacity} people`,
                },
                {
                  icon: assets.fuel_icon,
                  text: property.petsAllowed,
                },
                {
                  icon: assets.car_icon,
                  text: property.noOfBedroom,
                },
                {
                  icon: assets.location_icon,
                  text: property.location,
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className='flex flex-col items-center justify-center bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all'
                >
                  <img src={icon} alt='' className='h-5 mb-2' />
                  <span className='text-sm font-medium text-gray-700'>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className='text-xl font-semibold mb-3'>Description</h2>
              <p className='text-gray-600 leading-relaxed'>{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className='text-xl font-semibold mb-3'>Features</h2>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {["Swimming Pool", "Fitness Center", "Balcony", "Private Garden", "Central Air Conditioning", "Smart Home Technology", "Fireplace", "Garage", "Walk-in Closet", "Hardwood Floors"].map(
                  (item) => (
                    <li key={item} className='flex items-center text-gray-600'>
                      <img src={assets.check_icon} alt='' className='h-4 mr-2' />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Booking Form */}
        <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-[100px] rounded-xl p-6 space-y-6 bg-white border border-gray-200'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            ${property.pricePerDay}
            <span className='text-base text-gray-400 font-normal'>
              per day
            </span>
          </p>

          <hr className='border border-gray-200 my-4' />

          {/* Pick-up Date */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date" className='text-sm font-medium'>Rent Start Date</label>
            <input
            value={startDate}
            onChange={(e)=>setStartDate(e.target.value)}
              type="date"
              required
              id="pickup-date"
              className='border border-gray-300 px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Return Date */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date" className='text-sm font-medium'>Rent End Date</label>
            <input
             value={returnDate}
            onChange={(e)=>setReturnDate(e.target.value)}
              type="date"
              required
              id="return-date"
              className='border border-gray-300 px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 font-medium text-white rounded-xl'
          >
            Book Now
          </button>

          <p className='text-center text-sm text-gray-400'>
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PropertyDetails;
