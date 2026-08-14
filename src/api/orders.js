import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getMyOrders = async (token) => {
    const response = await axios.get(
        `${API_URL}/orders/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const createOrder = async (orderData, token) => {
  const response = await axios.post(
    `${API_URL}/orders`,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};