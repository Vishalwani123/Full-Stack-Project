import React, { useState, useEffect  } from 'react';
import { updateEvent } from '../services/eventService';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import '../Style/MakeEvent.css';

const UpdateEvent = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { event, id } = location.state || {};
    
    const [formData, setFormData] = useState({
        title: event.title,
        description: event.description,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        capacity: event.capacity,
        img: null,
    });


     useEffect(() => {
        const token  = localStorage.getItem('token');
        console.log("Token1------------------"+token);
        
        if (token ) {
          try {
            // setUser (JSON.parse(storedUser ));
             const decodedToken = jwtDecode(token);
             console.log("DecodedToken------------------"+decodedToken);
            if (decodedToken.userRole   && decodedToken.userRole  === 'ADMIN') {
                setIsAdmin(true);
            } else {
                setError('You do not have permission to create an event.');
            }
          } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            localStorage.removeItem('token');
          }
        }
        else {
            setError('You must be logged in to create an event.');
        }
      }, [location]);
    

    const handleChange = (e) => {
        // setFormData({...formData, [e.target.name]: e.target.value});
        
        if (e.target.name === 'img') {
            // Save the first file from the input
            setFormData({...formData, img: e.target.files[0] });
        } else if (e.target.name === 'capacity') {
            // Convert capacity to number
            setFormData({...formData, capacity: Number(e.target.value) });
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isAdmin) {
            setError('You do not have permission to create an event.');
            return;
        }
          
         try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
        
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }


            await updateEvent(formDataToSend, id, token);
            toast.success("Event updated successfully!", {autoClose: 800});
            setSuccess('Event updated successfully!');
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            console.error(err);
            toast.error("Event not updated", {autoClose: 800});
            setError('Error updating event.');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="heading">Update Event</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="title" className="input-label">Title</label>
                        <input 
                        type="text"
                        name="title"
                        placeholder="Type your Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description" className="input-label">Description</label>
                        <input 
                        type="text"
                        name="description"
                        placeholder="Type your Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="location" className="input-label">Location</label>
                        <input 
                        type="text"
                        name="location"
                        placeholder="Type your Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="startTime" className="input-label">StartTime</label>
                        <input 
                        type="datetime-local"
                        name="startTime"
                        placeholder="Type your StartTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="endTime" className="input-label">EndTime</label>
                        <input 
                        type="datetime-local"
                        name="endTime"
                        placeholder="Type your EndTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="capacity" className="input-label">Capacity</label>
                        <input 
                        type="number"
                        name="capacity"
                        placeholder="Type your Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="img" className="input-label">Upload New Image</label>
                        <input 
                        type="file"
                        accept="image/*"
                        name="img"
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <button type="submit" className="submit-button">Update Event</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );       
};


export default UpdateEvent;