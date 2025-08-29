import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

import { useNavigate } from 'react-router'
import { useAppContext } from '../context/AppContext'
import PropertyCard from './PropertyCard'

const FeaturedSection = () => {
    const navigate = useNavigate();
    const {properties} = useAppContext();
  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>

        <div>

            <Title title='Featured Properties' subtitle ='Luxury living awaits you at our premier feature property.' />

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {
                properties.slice(0,6).map((property)=>(
                    <div key={property._id}>
                        <PropertyCard property={property} />
                    </div>
                ))
            }

        </div>

        <button className='flex items-center justify-center gap-2 px-6 py-2 border border-black hover:bg-amber-950 rounded-md mt-18 hover:text-white cursor-pointer' onClick={()=>{navigate('/properties'); scrollTo(0,0)}} >Explore All Properties
            <img src={assets.arrow_icon} alt="" />
        </button>
        
    </div>
  )
}

export default FeaturedSection