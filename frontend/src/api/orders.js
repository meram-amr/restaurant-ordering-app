import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;


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

export const getAllOrders = async (token) => {
  const response = await axios.get(
    `${API_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.patch(
    `${API_URL}/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};