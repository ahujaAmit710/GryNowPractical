import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://newsdata.io/api/1/latest';
const API_KEY = 'pub_524ceecc1a8449d485e81dc37fef146f';
const QUERY = 'Plane crash';

interface NewsArticle {
  title: string;
  description: string;
  link: string;
  image_url?: string;
}

export const useNewsData = () => {
  const [data, setData] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get(API_URL, {
          params: {
            apikey: API_KEY,
            q: QUERY,
          },
        });

        setData(response.data.results ?? []);
      } catch (error) {
        setIsError(true);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { data, isLoading, isError };
};
