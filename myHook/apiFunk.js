import axios from 'axios';

const apiRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const apiPost = async (url, data = {}, headers = {}) => {
  return apiRequest('post', url, data, headers);
};

export const apiPut = async (url, data = {}, headers = {}) => {
  return apiRequest('put', url, data, headers);
};

export const apiDelete = async (url, headers = {}) => {
  return apiRequest('delete', url, {}, headers);
};
