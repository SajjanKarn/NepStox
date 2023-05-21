import { useState, useEffect } from "react";
import client from "../config/client";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function request() {
    try {
      const response = await client.get(url);
      console.log(response.data);
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
