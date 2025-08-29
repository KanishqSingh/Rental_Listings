import React, { useState } from 'react'
import TitleOwner from '../../Components/Owner/TitleOwner';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast'

const AddProperty = () => {
     const { axios } = useAppContext();
    
        const [image, setImage] = useState(null);
        const [property, setProperty] = useState({
            type: '',
            year: '',
            pricePerDay: '',
            floorSize: '',
            population_capacity: '',
            petsAllowed: '',
            location: '',
            description: '',
            noOfBedroom: '',
        });
    
        const [isLoading, setIsLoading] = useState(false)
    
        const onSubmitHandler = async (e) => {
            e.preventDefault();
            if (isLoading) {
                return null;
            }
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('propertyData', JSON.stringify(property))
    
                const { data } = await axios.post('/api/owner/add-property', formData)
    
                if (data.success) {
                    toast.success(data.message)
                    setImage(null);
                    setProperty({
                        type: '',
                        year: '',
                        pricePerDay: '',
                        floorSize: '',
                        population_capacity: '',
                        petsAllowed: '',
                        location: '',
                        description: '',
                        noOfBedroom: '',
    
                    })
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setIsLoading(false)
            }
        };
    
  return (
      <div className='px-4 py-10 md:px-10 flex-1 bg-gray-50 min-h-screen'>
            <TitleOwner title='Add New property' subTitle='Add a new property to the list and specify all property details' />

            <form onSubmit={onSubmitHandler} className='mt-8 bg-white shadow-md rounded-xl p-6 md:p-10 max-w-3xl mx-auto space-y-6'>
                {/* property Image */}
                <div className='flex items-center gap-4'>
                    <label htmlFor="property-image" className='cursor-pointer'>
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_icon}
                            alt="property"
                            className='h-20 w-32 object-cover border rounded-md'
                        />
                        <input type="file" accept='image/*' hidden id='property-image' onChange={e => setImage(e.target.files[0])} />
                    </label>
                    <p className='text-sm text-gray-500'>Click image to upload a property photo</p>
                </div>

                {/* Brand & Model */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                        <label className='block mb-1 font-medium'>Type</label>
                        <input type="text" required placeholder='e.g. House,Club,Land,Hotel'
                            value={property.type}
                            onChange={e => setProperty({ ...property, type: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                </div>

                {/* Year, Price, Category */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div>
                        <label className='block mb-1 font-medium'>Year</label>
                        <input type="number" required placeholder='e.g. 2023'
                            value={property.year}
                            onChange={e => setProperty({ ...property, year: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Daily Price ($)</label>
                        <input type="number" required placeholder='e.g. 100'
                            value={property.pricePerDay}
                            onChange={e => setProperty({ ...property, pricePerDay: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Floor Size</label>
                        <select value={property.floorSize}
                            onChange={e => setProperty({ ...property, floorSize: e.target.value })}
                            className='w-full border rounded-md p-2 bg-white focus:outline-blue-500'>
                            <option value="">Select</option>
                            <option value='One'>One</option>
                            <option value='Two'>Two</option>
                            <option value='Three'>Three</option>
                            <option value='Four'>Four</option>
                            <option value='Five'>Five</option>
                            <option value='Six +'>Six +</option>

                        </select>
                    </div>
                </div>

                {/* Transmission, Fuel, Seating */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div>
                        <label className='block mb-1 font-medium'>Populaton Capacity</label>
                        <select value={property.population_capacity}
                            onChange={e => setProperty({ ...property, population_capacity: e.target.value })}
                            className='w-full border rounded-md p-2 bg-white focus:outline-blue-500'>
                            <option value="">Select</option>
                            <option value='Family Purpose'>Family Purpose</option>
                            <option value='100-500'>100-500</option>
                            <option value='500-1000'>500-1000</option>
                            <option value='1000-1500'>1000-1500</option>
                            <option value='1500-2000'>1500-2000</option>
                            <option value='2000 +'>2000 +</option>
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Pets Allowed</label>
                        <select value={property.petsAllowed}
                            onChange={e => setProperty({ ...property, petsAllowed: e.target.value })}
                            className='w-full border rounded-md p-2 bg-white focus:outline-blue-500'>
                            <option value="">Select</option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                            <option value='Contact'>Contact</option>
                            
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>No. Of Bedroom</label>
                        <input type="number" required placeholder='e.g. 5'
                            value={property.seating_capacity}
                            onChange={e => setProperty({ ...property, noOfBedroom: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className='block mb-1 font-medium'>Location</label>
                    <input type="text" required placeholder='Enter city or region'
                        value={property.location}
                        onChange={e => setProperty({ ...property, location: e.target.value })}
                        className='w-full border rounded-md p-2 focus:outline-blue-500'
                    />
                </div>

                {/* Description */}
                <div>
                    <label className='block mb-1 font-medium'>Description</label>
                    <textarea rows={4} required placeholder='Write something about the property...'
                        value={property.description}
                        onChange={e => setProperty({ ...property, description: e.target.value })}
                        className='w-full border rounded-md p-2 focus:outline-blue-500 resize-none'
                    />
                </div>

                {/* Submit Button */}
                <button type='submit' className='flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all duration-200'>
                    <img src={assets.tick_icon} alt="tick" className='h-5 w-5' />
                    {isLoading ? 'Listing!! Wait' : 'List Your property'}
                </button>
            </form>
        </div>
  )
}

export default AddProperty