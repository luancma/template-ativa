import React, { useState, useEffect } from 'react';

export default function useFetch(url, name) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    url().then(value => setData(value.data[name]));

    setLoading(false);
  }, []);

  return { loading, data };
}
