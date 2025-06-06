import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookTicket  } from '../services/bookingService';
import { toast } from 'react-toastify';
import { getEventById } from '../services/eventService';
import EventCard from '../components/EventCard';
import '../Style/BookingEvent.css';

function BookTicketPage() {
  const { id } = useParams();
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [ticketsLeft, setTicketsLeft] = useState(0);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("BookingPage ticketsLeft:", ticketsLeft);
  }, [ticketsLeft]);

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(id);
      setEvent(fetchedEvent); 
      setTicketsLeft(Number(fetchedEvent.capacity));
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketsToBook = Number(numberOfTickets);
    if (ticketsToBook <= 0) {
      alert("Number of tickets must be at least 1");
      return;
    }
    if (ticketsLeft !== null && ticketsToBook > ticketsLeft) {
      alert("Not enough tickets left");
      return;
    }
    const bookingDetails = { ticket: numberOfTickets }; 
    
    console.log("Booking Details:", bookingDetails); 
    console.log("Event id is :", id);
    try {
      const responseData = await bookTicket(id, bookingDetails);
      console.log("Booking Response Data:", responseData);

      console.log("The Response Data is -------- "+responseData.qrCodes);
      console.log("The Response Data is -------- "+responseData.eventTitle);
      setTicketsLeft((prev) => (prev !== null ? prev - ticketsToBook : 0));

      toast.success(`${responseData.username} Booking is done for - ${responseData.eventTitle} `, {autoClose: 1000,}); 

      let qrCodeArray = responseData.qrCodes;
      if (typeof qrCodeArray === 'string') {
        qrCodeArray = qrCodeArray.split(',');
      }
      navigate('/qrcode', { state: { qrCodeValues: qrCodeArray, eventTitles: responseData.eventTitle } });
    } 
    catch (error) {
      toast.error(`Booking Fail`, {autoClose: 1000,});
      console.error("Error booking ticket:", error);
    }
  };

  return (
    <div className="booking -page-container">
      <h2 className="booking-header">Book Your Ticket</h2>
      <div className="event-card-container">
          {event && ticketsLeft !== null && (
            <EventCard
              event={event}
              ticketsLeft={ticketsLeft}
              showBookingForm={true}
              bookingForm={
                <form onSubmit={handleSubmit} className="booking-form-inside-card">
                  <div className="form-group">
                    <label htmlFor="ticketNumber">Number of Tickets</label>
                    <input
                      id="ticketNumber"
                      type="number"
                      min="1"
                      value={numberOfTickets}
                      onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                      className="form-control booking-input"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-book">Book Now</button>
                </form>
              }
              onView={() => {}} 
            />
          )}
      </div>
    </div>

  );
}

export default BookTicketPage;