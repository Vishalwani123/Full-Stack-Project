import axios from './api';

export const getAllEvents = async () => {
 
    const res = await axios.get('/api/events/getall');
    return res.data;

};

export const getEventById = async (id) => {
  const res = await axios.get(`/api/events/get/eventId/${id}`);
  return res.data;
};

export const getEventsByuserId = async (userId) => {
  console.log("Inside call part of userId");
  const res = await axios.get(`/api/events/get/userId/${userId}`);
  return res.data;
};

export const createEvent = async (userData, token) => {

  const res = await axios.post('/api/events/save', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const updateEvent = async (userData, id, token) => {

  const res = await axios.put(`/api/events/update/${id}`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    
  });

  return res.data;
};

export const deleteEventById = async (id, token) => {
  await axios.delete(`/api/events/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};