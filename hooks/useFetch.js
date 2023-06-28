import { useState, useEffect } from "react";
import client from "../config/client";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function request() {
    setLoading(true);
    try {
      const response = await client.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    request();
  }, [url]);

  return { data, loading, error };
}
