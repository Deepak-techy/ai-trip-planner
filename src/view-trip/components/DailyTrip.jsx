import React from 'react'
import PlaceCardItem from './PlaceCardItem';

const DailyTrip = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-lg mt-4'>Places To Visit</h2>

            <div>
                {trip?.tripData?.itinerary &&
                    Object.entries(trip?.tripData?.itinerary)
                        .sort(([a], [b]) => {
                            const numA = parseInt(a.replace('day', ''));
                            const numB = parseInt(b.replace('day', ''));
                            return numA - numB;
                        }).map(([dayKey, dayData], index) => (
                            <div key={dayKey} className='my-2'>
                                <h2 className='font-bold text-md'> {dayKey.replace("day", "Day ")} </h2>

                                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                                    {dayData?.map((place, index) => (
                                        <div key={index} className='my-3 '>
                                            <p className='inline-block bg-gray-100 text-gray-700 text-sm px-3  rounded-md shadow-sm'>Recommended Visit Time: {place?.best_time_to_visit} </p>

                                            <PlaceCardItem place={place} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    )
}

export default DailyTrip
