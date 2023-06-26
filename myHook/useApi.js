import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useGetAPI = (url, headers = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const usePostAPI = (url, body, headers = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(url, body, { headers });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    postData();
  }, []);

  return { data, loading, error };
};

const usePutAPI = (url, body, headers = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const putData = async () => {
      try {
        const response = await axios.put(url, body, { headers });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    putData();
  }, []);

  return { data, loading, error };
};

const useDeleteAPI = (url, headers = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const deleteData = async () => {
      try {
        const response = await axios.delete(url, { headers });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    deleteData();
  }, []);

  return { data, loading, error };
};

export { useGetAPI, usePostAPI, usePutAPI, useDeleteAPI };
