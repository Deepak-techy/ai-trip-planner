import React from 'react'
import { Link } from 'react-router-dom'
import { fetchHotelImage } from '../fetch-images/FetchImage-unsplash'
import { useState, useEffect } from 'react'

const HotelCardItem = ({ hotel, index }) => {
    const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

    useEffect(() => {
        const getImage = async () => {
            const url = await fetchHotelImage(hotel?.hotel_name);
            setImageUrl(url);
        };

        getImage();
    }, [hotel?.hotel_name]);

    return (
        <Link
            key={index}
            to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name + hotel?.hotel_address} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer hover:shadow-lg'>
                <img src={imageUrl} className='rounded-lg h-[180px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-semibold text-md'> {hotel?.hotel_name} </h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotel_address} </h2>
                    <h2 className='font-bold text-xs'>💰 {hotel?.price} </h2>
                    <h2 className='font-bold text-xs'>⭐ {hotel?.rating} </h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem
