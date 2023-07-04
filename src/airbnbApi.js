// airbnbApi.js
import axios from 'axios';
import { useEffect, useState } from 'react';

// const searchAirbnb = async (location, checkin, checkout, adults) => {
//   try {
//     const response = await axios.get('https://airbnb13.p.rapidapi.com/search-location', {
//       headers: {
//         'X-RapidAPI-Key': '08e2317928msh32774cecec1e49ep14eb0ejsned3846ac0369',
//         'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
//       },
//       params: {
//         location,
//         checkin,
//         checkout,
//         adults,
//         children: '0',
//         infants: '0',
//         pets: '0',
//         page: '1',
//         currency: 'USD',
//       },
//     });

//     return response.data.results;
//   } catch (error) {
//     console.error(error);
//   }
// };
const apiKey = '38025714-8dab2bc0a63c5f98c1f2b7f87';

const fetchPixabayData = async (q) => {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q,
        lang: 'en',
        image_type: 'photo',
        orientation: 'all',
        category: 'nature',
        min_width: 100,
        min_height: 100,
        editors_choice: false,
        safesearch: true,
        order: 'popular',
        page: 1,
        per_page: 20,
      }
    });
    return data
    console.log(data);
  } catch (error) {
    console.error('Error fetching data from Pixabay:', error);
  }
};
const useFetchData = (searchResults, q = 'Flowers') => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (searchResults !== undefined) {
        setPlaces(searchResults.hits);
      } else {
        const results = await fetchPixabayData(q);
        setPlaces(results.hits);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [searchResults, q]);

  return { places, loading };
};

export {
  fetchPixabayData,useFetchData 
};