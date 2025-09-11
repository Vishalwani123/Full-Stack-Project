import { useEffect, useState } from 'react';
import { getEventsByuserId } from '../services/eventService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../Style/Dashboard.css';

function YourEvents() {
  const { userId } = useParams();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

 useEffect(() => {
     const token = localStorage.getItem('token');
     if (token) {
       setIsAuthenticated(true);
     }
     getEventsByuserId(userId).then(setEvents);
   }, [userId]);

  const handleView = (id) => {
    if (isAuthenticated) {
      navigate(`/event/${id}/${userId}`); 
    } else {
      toast.success(`Login to continue`, {autoClose: 800,});
      setTimeout(() => navigate('/login'), 100);
    }
  };

  return (
      <div className="dashboard-container mt-4">
        <div className="scroll-container">
          {events.map(event => (
            <EventCard key={event.id} event={event} onView={handleView}/>
          ))}
        </div> 
      </div>
  );
}

export default YourEvents;