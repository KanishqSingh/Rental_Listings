
import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../Components/Title';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const DashBoard = () => {
    const { axios, isOwner } = useAppContext();

    const [datax, setDatax] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0
    });

    const fetchDashBoardData = async () => {
        try {
            const response = await axios.get('/api/owner/dashboard');
            const { data } = response;

            if (data.success) {
    
                setDatax(data.dashBoardData);
            } else {
                toast.error(data.message);
                console.log(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

  

    useEffect(() => {
        if (isOwner) {
            fetchDashBoardData();
        }
    }, [isOwner]);

    const DashBoardCards = [
        {
            title: "Total Cars",
            value: datax.totalCars,
            icon: assets.carIconColored
        },
        {
            title: "Total Bookings",
            value: datax.totalBookings,
            icon: assets.listIconColored
        },
        {
            title: "Pending",
            value: datax.pendingBookings,
            icon: assets.cautionIconColored
        },
        {
            title: "Confirmed",
            value: datax.completedBookings,
            icon: assets.listIconColored
        }
    ];

    return (
        <div className='px-4 pt-10 md:px-10 flex-1 bg-gray-50 min-h-screen'>
            <Title title='Admin Dashboard' subTitle='Overview of fleet, bookings, and revenue' />

            {/* Cards */}
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10'>
                {DashBoardCards.map((card, index) => (
                    <div key={index} className='bg-white shadow-md rounded-2xl p-5 flex justify-between items-center hover:shadow-lg transition-all duration-300'>
                        <div>
                            <h2 className='text-sm text-gray-500'>{card.title}</h2>
                            <p className='text-xl font-bold text-gray-800'>{card.value}</p>
                        </div>
                        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100'>
                            <img src={card.icon} alt="" className='w-5 h-5' />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className='flex flex-col lg:flex-row gap-6 w-full mb-10'>
                {/* Recent Bookings */}
                <div className='bg-white shadow-md rounded-2xl p-6 flex-1'>
                    <h1 className="text-lg font-semibold text-gray-800">Recent Bookings</h1>
                    <p className='text-sm text-gray-500 mb-4'>Latest customer bookings</p>

                    {datax.recentBookings.map((booking, index) => (
                        <div key={index} className='mt-4 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-blue-200'>
                                    <img src={assets.listIconColored} alt="" className='h-5 w-5' />
                                </div>
                                <div className='text-sm text-gray-700'>
                                    {booking.car.brand} {booking.car.model}
                                    <span className="block text-xs text-gray-400">{booking.createdAt.split('T')[0]}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='text-sm font-medium text-gray-700'>${booking.price}</p>
                                <p className={`px-3 py-0.5 border rounded-full text-sm font-medium ${
                                    booking.status === 'Pending' ? 'text-yellow-600 border-yellow-400' : 'text-green-600 border-green-400'
                                }`}>
                                    {booking.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Monthly Revenue */}
                <div className='bg-white shadow-md rounded-2xl p-6 w-full lg:w-[350px]'>
                    <h1 className="text-lg font-semibold text-gray-800">Monthly Revenue</h1>
                    <p className='text-sm text-gray-500 mb-2'>Revenue for the current month</p>
                    <div className='mt-4 text-3xl font-bold text-green-600'>${datax.monthlyRevenue}</div>
                    <p className="text-xs text-gray-400 mt-1">Includes all completed bookings</p>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
