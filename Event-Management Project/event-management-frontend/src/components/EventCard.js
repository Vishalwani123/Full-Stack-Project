// EventCard.js

import React from 'react';
// import { ticketsLeft } from '../pages/BookTicketPage';
import '../Style/EventCard.css';


function EventCard({ event, ticketsLeft, onView, showBookingForm = false, bookingForm = null }) {
  
  const imageSrc = event.img ? `data:image/jpg;base64,${event.img}` : null;
  console.log("EventCard props:", { event, ticketsLeft });

  console.log("Ticket Left is ------------ "+ticketsLeft);

  return (
    <div className="event-card">
      {imageSrc && (
        <img className="event-image" src={imageSrc} alt={event.title} />
      )}
      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-description">{event.description}</p>
        <p className="event-info"><strong>Location:</strong> {event.location}</p>
        <p className="event-info"><strong>Capacity:</strong> {event.capacity}</p>
        <p>Tickets Left: {ticketsLeft !== undefined ? ticketsLeft : "N/A"}</p>
        
        {!showBookingForm && (
          <button className="view-button" onClick={() => onView(event.id)}>View</button>
        )}
        {showBookingForm && bookingForm}
      </div>
    </div>
  );
};


export default EventCard;


