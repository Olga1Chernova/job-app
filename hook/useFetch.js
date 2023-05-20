import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from '@env';

import throttle from "lodash.throttle";

const useFetch = (endpoint, query, delay) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      alert('Error happened');
    } finally {
      setIsLoading(false);
    }
    };

  // Throttle the fetchData function to limit the request rate
  const throttledFetchData = throttle(fetchData, delay);

  useEffect(() => {
    throttledFetchData();
    // Cancel the throttled function on unmount
    return () => {
      throttledFetchData.cancel();
    };
  }, []);

  return { data, isLoading, error };
};

export default useFetch;