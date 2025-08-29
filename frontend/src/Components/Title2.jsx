import React from 'react'

const Title2 = ({title,subtitle,align}) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align === 'left' && 'md:items-start md:text-left'}`}>

        <h1 className='font-semibold text-4xl text-white md:text-[40px]'>{title}</h1>
        <h1 className='text-sm md:text-base text-white mt-2 max-w-156'>{subtitle}</h1>

    </div>
  )
}

export default Title2