import axios from 'axios';
import { useEffect, useState } from 'react';

const BACKEND_URL = 'https://backendproject.vercel.app';

const fetchPixabayData = async (q) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/pixabay`, {
      params: { q },
    });
    return data;
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

export { fetchPixabayData, useFetchData };