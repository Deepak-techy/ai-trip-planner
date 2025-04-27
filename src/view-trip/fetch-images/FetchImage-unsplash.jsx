import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Function to fetch hotel image from Unsplash
export const fetchHotelImage = async (hotelName) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: hotelName,
        per_page: 1,   // Only 1 best image
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      return results[0].urls.regular; // you can also use 'small' if you want lighter
    } else {
      return '/placeholder.jpg'; // fallback if no image found
    }
  } catch (error) {
    console.error("Error fetching hotel image:", error);
    return '/placeholder.jpg'; // fallback if error happens
  }
};


export const fetchPlaceImage = async (placeName) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: placeName,
        per_page: 1,   // Only 1 best image
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      return results[0].urls.regular; // you can also use 'small' if you want lighter
    } else {
      return '/placeholder.jpg'; // fallback if no image found
    }
  } catch (error) {
    console.error("Error fetching place image:", error);
    return '/placeholder.jpg'; // fallback if error happens
  }
};


export const fetchLocationImage = async (locationName) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: locationName + "tourist destination",
        per_page: 1,   // Only 1 best image
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      return results[0].urls.regular; // you can also use 'small' if you want lighter
    } else {
      return '/placeholder.jpg'; // fallback if no image found
    }
  } catch (error) {
    console.error("Error fetching place image:", error);
    return '/placeholder.jpg'; // fallback if error happens
  }
};
