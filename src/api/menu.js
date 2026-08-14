import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getMenu = async (category = "") => {
  const response = await axios.get(`${API_URL}/menu`, {
    params: category
      ? { category }
      : {},
  });

  return response.data;
};

export const createMenuItem = async (data, token) => {
  const response = await axios.post(
    `${API_URL}/menu`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};