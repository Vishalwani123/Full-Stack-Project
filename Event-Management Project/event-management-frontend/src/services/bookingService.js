import axios from './api';

export const bookTicket = async (id, bookingDetails) => {
  try {
    const res = await axios.post(`/api/bookings/${id}`, bookingDetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error booking ticket:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getTicket = async () => {
  try {
    console.log("Start 2");
    const res = await axios.get("/api/bookings/user/tickets", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    console.log("Start 3");
    return res.data; 
  } catch (error) {
    console.log("End 1");
    throw error; 
  }
};