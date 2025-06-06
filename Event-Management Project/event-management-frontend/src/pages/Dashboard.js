
// Dashboard.js
import { useEffect, useState } from 'react';
import { getAllEvents } from '../services/eventService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import '../Style/Dashboard.css';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token inside Dashboard is ----------------- "+token);
    if (token) {
      setIsAuthenticated(true);
    }
    getAllEvents().then(setEvents);
  }, []);

  const handleView = (id) => {
    if (isAuthenticated) {
      navigate(`/event/${id}`); 
    } else {
      toast.success(`Login to continue`, {autoClose: 800,});
      setTimeout(() => navigate('/login'), 300);
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

export default Dashboard;
