import axios from './api';

export const bookTicket = async (id, bookingDetails) => {
  try {
    const res = await axios.post(`/api/bookings/${id}`, bookingDetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token if needed
      }
    });
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error booking ticket:", error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
};

export const getTicket = async () => {
  try {
    const res = await axios.get(`/api/bookings/user/tickets`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token if needed
      }
      
    });
    console.log("GetAll booking is working" + res.data.qrCodes);
    return res.data; // Return the response data
  } catch (error) {
    console.error("Error booking ticket:", error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for handling in the component
  }
};
