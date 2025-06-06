import axios from './api';

export const getAllCars = async () => {
  const res = await axios.get('/api/customer/cars');  
  return res.data;
};

export const getMyCars = async (userId, token) => {
    // const response = await api.get('/api/customer/cars');
    // return response.data;

    const res = await axios.get(`/api/customer/mycars/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

// export const deleteCar = async (userId, token) => {
//     // const response = await api.get('/api/customer/cars');
//     // return response.data;

//     const res = await axios.delete(`/api/customer/car/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
    
//   });

//   return res.data;
// };

export const getAnalytics = async (userId, token) => {
    // const response = await api.get(`api/customer/car/analytics/${id}`);
    // return response.data;

    const res = await axios.get(`api/customer/car/analytics/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const postCar = async (formData, token) => {
    // const response = await api.get('/api/customer/cars');
    // return response.data;

    const res = await axios.post('/api/customer/car',formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const fetchMyBids = async (userId, token) => {
    // const response = await api.get('/api/customer/cars');
    // return response.data;

    const res = await axios.get(`/api/customer/car/bids/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const change = async (id, status, token) => {
    // const response = await api.get('/api/customer/cars');
    // return response.data;

    const res = await axios.put(`/api/customer/car/bid/${id}/${status}`, {
    status,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const searchCar = async (formData, token) => {
    // const response = await api.get('/api/customer/cars');
    // return response.data;

    const res = await axios.post('/api/customer/car/search',formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const getCarById = async (token, id) => {
  const res = await axios.get(`/api/customer/car/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const bidACar = async (token, bidData) => {
  const res = await axios.post('/api/customer/car/bid', bidData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const deleteCar = (token, id) => {
  return axios.delete(`/api/customer/car/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getBidsByCarId = async (token, carId) => {
  console.log("The CarId inside service class "+ carId);
   const res = await axios.get(`/api/customer/car/${carId}/bids`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log("The response inside service class "+ res);
  return res.data;
};

export const updateBidStatus = async (bidId, status, token) => {
   const res = await axios.get(`api/customer/car/bid/${bidId}/${status}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log("The response inside service class "+ res);
  return res.data;
};

export const updateACar = async (id, formData, token) => {
    // const response = await api.get('/api/customer/cars');
    // return response.data;

    const res = await axios.put(`/api/customer/car/${id}`,formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    
  });
  console.log("The response in update service --------"+res.data);
  return res.data;
};