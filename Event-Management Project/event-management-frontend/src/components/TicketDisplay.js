function TicketDisplay({ ticket }) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5>Ticket #{ticket.id}</h5>
          <p>Event: {ticket.eventName}</p>
          <p>Holder: {ticket.userName}</p>
          <p>Status: {ticket.status}</p>
        </div>
      </div>
    );
  }
  
  export default TicketDisplay;