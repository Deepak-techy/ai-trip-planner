import React from 'react'
import HotelCardItem from './HotelCardItem'

const Hotels = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Hotels
