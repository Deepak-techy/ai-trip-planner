import { fetchLocationImage } from '@/view-trip/fetch-images/FetchImage-unsplash';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {

  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    const getImage = async () => {
      const url = await fetchLocationImage(trip?.userSelection?.Location);
      setImageUrl(url);
    };

    getImage();
  }, [trip?.userSelection?.Location]);

  return (
    <Link to={"/view-trip/" + trip?.id} >
    <div className='hover:scale-105 transition-all cursor-pointer hover:shadow-lg mb-3'>
      <img src={imageUrl}
        className='h-[200px] w-full object-cover rounded-xl' />
      <div>
        <h2 className='font-bold text-lg'> {trip?.userSelection?.Location} </h2>
        <h2 className='text-sm text-gray-700'> {trip?.userSelection?.NoOfDays} Days Trip With {trip?.userSelection.Budget} Budget </h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
