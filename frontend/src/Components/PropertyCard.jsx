import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router'

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    
    return (
        <div className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer' onClick={()=>{navigate(`/property-details/${property._id}`); scrollTo(0,0)} }>

            <div className='relative h-48 overflow-hidden'>

                <img src={property.image} alt="property Image" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />

                {property.isAvaliable && <p className='absolute top-4 left-4 bg-amber-950 text-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>}

                <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
                    <span className='font-semibold'>${property.pricePerDay}</span>
                    <span className='text-sm text-white/80'>/ day</span>

                </div>

            </div>

            <div className='p-4 sm:p-5'>
                <div className='flex justify-between items-start mb-2'>
                    <div>
                        <h3 className='text-lg font-medium'>{property.type}</h3>
                        <p className='text-muted-foreground text-sm'>{property.population_capacity} / {property.year}</p>
                    </div>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-y-3 gap-x-3 text-gray-600'>
                    <div className='flex items-center text-sm text-gray-700'>
                        <img src={assets.users_icon} className='h-4 mr-2' alt="" />
                        <span className='text-sm'>{property.petsAllowed} pets Allowed</span>
                    </div>
                         <div className='flex items-center text-sm text-gray-700'>
                        <img src={assets.fuel_icon} className='h-4 mr-2' alt="" />
                        <span>{property.floorSize} floor</span>
                    </div>
                         
                         <div className='flex items-center text-sm text-gray-700'>
                        <img src={assets.location_icon} className='h-4 mr-2' alt="" />
                        <span>{property.location} </span>
                    </div>


                </div>



            </div>

        </div>
    )
}

export default PropertyCard