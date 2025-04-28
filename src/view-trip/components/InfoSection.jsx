import React from 'react'
import { FaShare } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { fetchLocationImage } from '../fetch-images/FetchImage-unsplash';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const InfoSection = ({ trip }) => {

    const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

    useEffect(() => {
        const getImage = async () => {
            const url = await fetchLocationImage(trip?.userSelection?.Location);
            setImageUrl(url);
        };

        getImage();
    }, [trip?.userSelection?.Location]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check this out!',
                    text: 'I am planning a trip, check it out!',
                    url: window.location.href,  // current page URL
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy URL to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast('Link copied to clipboard! Share it manually.');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    };


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
                <Button className='cursor-pointer' onClick={handleShare}><FaShare /></Button>
            </div>
        </div>
    )
}

export default InfoSection
