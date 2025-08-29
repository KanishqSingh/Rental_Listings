import React from "react";
import { Carousel } from "antd";
import { assets } from "../assets/assets";
import Title from "./Title";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center p-6 min-h-screen ">
        
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        <Title title="About our company and team" subtitle="We dream and vision to give you the best properties for your comfort"/>
  
        
        {/* Header Section */}
        

        {/* Carousel Section */}
        <Carousel className="mt-6" arrows infinite={true} autoplay>
          <div>
            <img
              className="w-full h-[500px] object-cover transition-transform duration-500 "
              src={assets.aboutus}
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              className="w-full h-[500px] object-cover transition-transform duration-500 "
              src={assets.aboutvision}
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              className="w-full h-[500px] object-cover transition-transform duration-500 "
              src={assets.aboutteam}
              alt="Slide 3"
            />
          </div>
          <div>
            <img
              className="w-full h-[500px] object-cover transition-transform duration-500 "
              src={assets.aboutcontact}
              alt="Slide 4"
            />
          </div>
        </Carousel>

        {/* Footer Section */}

      </div>
    </div>
  );
};

export default AboutUs;
