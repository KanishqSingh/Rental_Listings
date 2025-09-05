import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useSearchParams } from 'react-router';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Title2 from '../Components/Title2';
import PropertyCard from '../Components/PropertyCard';

const Properties = () => {
  const [input, setInput] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [searchParams] = useSearchParams();
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const returnDate = searchParams.get('returnDate');
  const { axios } = useAppContext();

  // ✅ check availability API
  const searchPropertyAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', { 
        location,
        startDate,
        returnDate,
      });

      console.log("data inside searchAvailablity -- ", data);

      if (data.success) {
        setFilteredProperties(data.availableProperties);
        if (data.availableProperties.length === 0) {
          toast('No properties available');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching properties');
    }
  };

  const fetchAllProperties = async () => {
    try {
      const { data } = await axios.get('/api/bookings/properties');
      console.log("data inside fetchallproperties",data);
      
      if (data.success) {
        setFilteredProperties(data.properties);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching all properties');
    }
  };

  useEffect(() => {
    if (location && startDate && returnDate) {
      searchPropertyAvailability();
    } else {
      fetchAllProperties();
    }
  }, [startDate, location, returnDate]);

  
  const displayedProperties = filteredProperties.filter((property) =>
    (property?.location?.toLowerCase() || "").includes(input.toLowerCase()) ||
    (property?.type?.toLowerCase() || "").includes(input.toLowerCase()) ||
    (property?.description?.toLowerCase() || "").includes(input.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center py-20 bg-gradient-to-r from-blue-950 to-amber-950 max-md:px-4">
        <Title2
          title="Available Properties"
          subtitle="Browse our selection of premium property available for your rent and comfort"
        />
        
        {/* Search Bar */}
        <div className="flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow-md">
          <img src={assets.search_icon} alt="search" className="w-4 h-4 mr-2 opacity-70" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by location, type, or description"
            className="w-full h-full outline-none text-gray-700 placeholder-gray-400"
          />
          <img src={assets.filter_icon} alt="filter" className="w-4 h-4 ml-2 opacity-70" />
        </div>
      </div>

      {/* Properties List */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pb-20">
        <p className="text-gray-600 text-sm mb-4">
          Showing {displayedProperties.length} Property{displayedProperties.length !== 1 ? 's' : ''}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayedProperties.map((property, index) => (
            <PropertyCard key={index} property={property} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
