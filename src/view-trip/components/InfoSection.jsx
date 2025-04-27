import React from 'react'
import { FaShare } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { fetchLocationImage } from '../fetch-images/FetchImage-unsplash';
import { useState, useEffect } from 'react';

const InfoSection = ({ trip }) => {

    const [imageUrl, setImageUrl] = useState('/placeholder.jpg');
    
        useEffect(() => {
            const getImage = async () => {
                const url = await fetchLocationImage(trip?.userSelection?.Location);
                setImageUrl(url);
            };
    
            getImage();
        }, [trip?.userSelection?.Location]);

    return (
        <div>
            <img src={imageUrl} className='h-[340px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'> {trip?.userSelection?.Location} </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.NoOfDays} Day </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.Budget} Budget </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Traveller:  {trip?.userSelection?.TravelCompanion} </h2>
                    </div>
                </div>
                <Button><FaShare /></Button>
            </div>
        </div>
    )
}

export default InfoSection
