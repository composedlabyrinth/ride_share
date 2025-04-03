import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endpoint, includeCredentials = false) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const url = endpoint ? `${baseURL}/${endpoint}` : baseURL; // Check if endpoint is provided

  useEffect(() => {
    if (!endpoint) console.log("1234567890");
    ; // Do nothing if endpoint is missing or undefined

    setLoading(true);
    const axiosConfig = includeCredentials ? { withCredentials: true } : {};
    axios
      .get(url, axiosConfig)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message || 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, includeCredentials, endpoint]); // Add `endpoint` to the dependency array

  function refetch() {
    if (!endpoint) return; // Do nothing if endpoint is missing or undefined

    setLoading(true);
    const axiosConfig = includeCredentials ? { withCredentials: true } : {};
    axios
      .get(url, axiosConfig)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message || 'An unknown error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { data, loading, error, refetch };
};

export default useFetch;