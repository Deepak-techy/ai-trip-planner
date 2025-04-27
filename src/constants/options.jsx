export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

// export const AI_PROMPT = 'Generate Travel Plan for Location : {Location}, for {NoOfDays} Days for {TravelCompanion} with a {Budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {NoOfDays} days with each day plan with best time to visit in JSON format'



export const AI_PROMPT = `Generate Travel Plan for Location: \${Location}, for \${NoOfDays} Days for \${TravelCompanion} with a \${Budget} budget. 
Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions 
and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, 
Time travel each of the location for \${NoOfDays} days with each day plan with best time to visit in the following JSON format:

{
  "hotels": [
    {
      "hotel_name": "Hotel Placeholder 1",
      "hotel_address": "Address Placeholder 1",
      "price": "₹Placeholder",
      "hotel_image_url": "url Placeholder 1",
      "geo_coordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 0.0,
      "description": "Description Placeholder 1"
    },
    {
      "hotel_name": "Hotel Placeholder 2",
      "hotel_address": "Address Placeholder 2",
      "price": "₹Placeholder",
      "hotel_image_url": "url Placeholder 2",
      "geo_coordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 0.0,
      "description": "Description Placeholder 2"
    }
  ],
  "itinerary": {
    "day1": [
      {
        "place_name": "Place Placeholder 1",
        "place_details": "Details Placeholder 1",
        "place_image_url": "url Placeholder 3",
        "geo_coordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticket_pricing": "₹Placeholder",
        "rating": 0.0,
        "time_to_travel": "Placeholder time",
        "best_time_to_visit": "Placeholder time"
      },
      {
        "place_name": "Place Placeholder 2",
        "place_details": "Details Placeholder 2",
        "place_image_url": "url Placeholder 4",
        "geo_coordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticket_pricing": "₹Placeholder",
        "rating": 0.0,
        "time_to_travel": "Placeholder time",
        "best_time_to_visit": "Placeholder time"
      }
    ],
    "day2": [
      {
        "place_name": "Place Placeholder 3",
        "place_details": "Details Placeholder 3",
        "place_image_url": "url Placeholder 5",
        "geo_coordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticket_pricing": "₹Placeholder",
        "rating": 0.0,
        "time_to_travel": "Placeholder time",
        "best_time_to_visit": "Placeholder time"
      }
    ]
  }
}`