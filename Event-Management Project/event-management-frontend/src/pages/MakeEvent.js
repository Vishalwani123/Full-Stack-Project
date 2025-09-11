import React, { useState, useEffect  } from 'react';
import { createEvent } from '../services/eventService';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../Style/MakeEvent.css';

const MakeEvent = () => {
    const [formData, setFormData] = useState({ title: '', description: '', location: '', startTime: '', endTime: '', capacity: 0, img: null});
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    

     useEffect(() => {
        const token  = localStorage.getItem('token');
        console.log("Token1------------------"+token);
        
        if (token ) {
          try {
             const decodedToken = jwtDecode(token);
             const role = decodedToken.sub.split(":").pop();

            if (role   && role  === 'ADMIN') {
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

        if (e.target.name === 'img') {
            setFormData({...formData, img: e.target.files[0] });
        } else if (e.target.name === 'capacity') {
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

            await createEvent(formDataToSend, token);
            console.log("Event Created Successfully.........!");
            console.log("FormData is here-----------------"+formData.title+formData.capacity);
            console.log("Image is here----------"+ formData.image);
            setSuccess('Create Event Successfull.');
            setTimeout(() => navigate('/'), 500);
        } catch (err) {
            setError('Event not Created');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="heading">Create Event</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>  
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
                        </>
                    )}
                    {step === 2 && (
                        <>
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
                                <label htmlFor="image" className="input-label">Upload Image</label>
                                <input 
                                type="file"
                                accept="image/*"
                                name="img"
                                onChange={handleChange}
                                required
                                className="input-field"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-between mt-4 w-full">
                        <div>
                             {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="PreviousButton"
                                >
                                    Previous
                                </button>
                            )}
                        </div>
                        <div> 
                            {step < 2 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step + 1)}
                                    className="NextButton"
                                >
                                    Next
                                </button>
                            )}
                        </div>

                        {step === 2 && (
                        <button type="submit" className="submit-button">Create Event</button>
                        )}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );       
};


export default MakeEvent;