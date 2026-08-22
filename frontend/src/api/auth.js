import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);

  return response.data;
};

export const login = async (formData) => {
  const response = await axios.post(`${API_URL}/auth/login`, formData);

  return response.data;
};

export const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
