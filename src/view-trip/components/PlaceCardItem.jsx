import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
// import { fetchPlaceImage } from '../fetch-images/FetchPlaceImage-wikipedia';
import { fetchPlaceImage } from '../fetch-images/FetchImage-unsplash';


const PlaceCardItem = ({ place }) => {

    const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

    useEffect(() => {
        async function getImage() {
            const url = await fetchPlaceImage(place?.place_name);
            if(url) {
                setImageUrl(url);
            }
        }

        if (place?.place_name) {
            getImage();
        }
    }, [place?.place_name]);

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.place_name} target='_blank'>
            <div className='border rounded-xl shadow-sm p-3 flex gap-4 h-[200px] overflow-hidden mt-3 hover:scale-105 transition-all hover:shadow-xl  '>
                <img src={ imageUrl } className='w-[200px] h-full rounded-lg object-cover' />

                <div className='flex flex-col justify-between w-full overflow-hidden'>
                    <div className='overflow-hidden'>
                        <h2 className='font-semibold text-base md:text-lg truncate'>{place?.place_name}</h2>
                        <p className='text-xs md:text-sm text-gray-500 line-clamp-3'>{place?.place_details}</p>
                    </div>

                    <div className="text-xs md:text-sm flex flex-wrap justify-between items-center mt-12">
                        <span className={Number(place?.rating) >= 4.5 ? 'text-yellow-600 font-semibold' : 'text-gray-600'}>
                            ⭐ {place?.rating}
                        </span>
                        <span className='text-gray-800 font-medium'>
                            🎟️ Ticket: {place?.ticket_pricing}
                        </span>
                    </div>

                    <div>
                        <p className='text-xs md:text-sm text-gray-500'>⏱️ {place?.time_to_travel}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
