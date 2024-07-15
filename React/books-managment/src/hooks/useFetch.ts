import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function useFetch<T>(url?: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (fetchUrl: string = url!) => {
    setIsLoading(true);
    try {
      const response = await axios.get<T>(fetchUrl);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching the data.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return { data, isLoading, error, fetchData };
}

export default useFetch;