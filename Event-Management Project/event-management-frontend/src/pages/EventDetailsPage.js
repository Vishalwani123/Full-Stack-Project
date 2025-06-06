import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, deleteEventById } from '../services/eventService';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import '../Style/EventCard.css';

function EventDetailsPage() {
  const { id } = useParams();   
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token inside Dashboard is ----------------- "+token);
    if(token){
      try{
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole   && decodedToken.userRole  === 'ADMIN') {
            setIsAdmin(true);
        } else {
            console.log('You do not have permission to create an event.');
        }
    }
    catch(error){
      console.error("Error parsing user data from localStorage:", error);
    }
    }
    else {
      console.log("Token or user not available yet");
    }

    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(id);
      setEvent(fetchedEvent);
    };
    fetchEvent();

  }, [id]);

  const handleDelete = async () => {
    console.log("Id in delete function is "+id);
    if (window.confirm("Are you sure you want to delete this event?")) {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      try {
        await deleteEventById(id, token); // Call the delete service with the token
        toast.success(`${event.title} is deleted successfully!`, {autoClose: 800, hideProgressBar: true}); // Display a success message
        navigate('/'); // Redirect to the dashboard after deletion
      } catch (error) {
        toast.error(`${event.title} not deleted `, {autoClose: 800, hideProgressBar: true});
        console.error("Error deleting event:", error);
      }
    }
  };  

  const handleUpdate = async () => {
      navigate("/UpdateEvent", { state: { event, id } }); 
     
  }

  const handleBook = async () => {
    navigate(`/book/${id}`);
  }
  if (!event) return <div>Loading...</div>;

  return (
     <div className="event-detail">
          <div className="event-detail">
          <h1>{event.title}</h1>
          {event.img && <img src={`data:image/jpg;base64,${event.img}`} alt={event.title} />}
          <p>{event.description}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Capacity:</strong> {event.capacity}</p>
          <div className='button-container'>
            <button className='updateEvent' onClick={handleBook}>Book Event</button>
            {isAdmin && (
             
              <button className='updateEvent' onClick={handleUpdate}>Update Event</button>
            )}
            {isAdmin && (
             
              <button className='deleteEvent' onClick={handleDelete}>Delete Event</button>
            )}
          </div>
        </div>
     </div>
    
  );
}

export default EventDetailsPage;