import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import TitleOwner from '../../Components/Owner/TitleOwner';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageProperty = () => {

      const { isOwner, axios } = useAppContext();
  const [properties, setProperties] = useState([]);

  // Fetch owner properties
  const fetchOwnerProperties = async () => {
    try {
      const { data } = await axios.get('/api/owner/properties');
      if (data.success) {
        console.log('Fetched properties:', data.properties);
        setProperties(data.properties);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle availability of a property
  const toggleAvailability = async (propertyId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-property', { propertyId: propertyId }); // you may want to rename endpoint later
      if (data.success) {
        toast.success(data.message);
        fetchOwnerProperties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete a property
  const deleteProperty = async (propertyId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this property?');
      if (!confirm) return;

      const { data } = await axios.post('/api/owner/delete-property', { propertyId: propertyId }); // endpoint name may need change
      if (data.success) {
        toast.success(data.message);
        fetchOwnerProperties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) fetchOwnerProperties();
  }, [isOwner]);

  return (
     <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner title="Manage Properties" />

      <div className="max-w-6xl w-full overflow-x-auto mt-6 border border-gray-300 rounded-lg shadow-md">
        <table className="w-full border-collapse text-left text-sm min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-600">Property</th>
              <th className="p-4 font-medium text-gray-600 max-md:hidden">Type</th>
              <th className="p-4 font-medium text-gray-600">Price/Day</th>
              <th className="p-4 font-medium text-gray-600 max-lg:hidden">Location</th>
              <th className="p-4 font-medium text-gray-600 max-md:hidden">Status</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((property, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Image + Info */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={property.image}
                    alt="property"
                    className="w-20 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-medium capitalize">{property.type}</p>
                    <p className="text-xs text-gray-500">
                      {property.noOfBedroom
                        ? `${property.noOfBedroom} Bedrooms`
                        : 'N/A'}{' '}
                      / Year Built: {property.year}
                    </p>
                  </div>
                </td>

                {/* Property Type */}
                <td className="p-4 max-md:hidden text-gray-700">{property.type}</td>

                {/* Price */}
                <td className="p-4 text-gray-800 font-semibold">
                  ${property.pricePerDay}/day
                </td>

                {/* Location */}
                <td className="p-4 max-lg:hidden text-gray-600">
                  {property.location || 'Unknown'}
                </td>

                {/* Availability */}
                <td className="p-4 max-md:hidden">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      property.isAvailable
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {property.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={
                      property.isAvailable
                        ? assets.eye_close_icon
                        : assets.eye_icon
                    }
                    alt="toggle"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => toggleAvailability(property._id)}
                  />

                  <img
                    src={assets.delete_icon}
                    alt="delete"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => deleteProperty(property._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageProperty