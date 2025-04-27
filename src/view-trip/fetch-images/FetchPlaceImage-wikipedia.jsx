import axios from 'axios';

export async function fetchPlaceImage(placeName) {
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        prop: 'pageimages',
        titles: placeName,
        pithumbsize: 500,
        origin: '*',
      },
    });

    const pages = response.data.query.pages;
    const page = Object.values(pages)[0];

    if (page?.thumbnail?.source) {
      return page.thumbnail.source; // ✅ Return image URL
    } else {
      return null; // ❌ No image
    }
  } catch (error) {
    console.error('Error fetching place image:', error);
    return null;
  }
}


