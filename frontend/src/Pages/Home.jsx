import React from 'react'

import FeaturedSection from '../Components/FeaturedSection'
import Banner from '../Components/Banner'
import Testimonial from '../Components/Testimonial'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import AboutUs from '../Components/AboutUs'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedSection/>
      <Banner/>
      <Testimonial/>
      <Newsletter/>
      <AboutUs/>
      
        
    </div>
  )
}

export default Home