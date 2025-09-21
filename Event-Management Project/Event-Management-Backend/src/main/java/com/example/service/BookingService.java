package com.example.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.BookingDto;
import com.example.entities.Booking;
import com.example.entities.Event;
import com.example.entities.Ticket;
import com.example.entities.User;
import com.example.repository.BookingRepository;
import com.example.repository.EventRepository;
import com.example.repository.TicketRepository;

@Service
public class BookingService {
	
	@Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private EventService eventService;

    public BookingDto createBooking(User user, Event event, int numberOfTickets) throws Exception {
        int bookedTickets = bookingRepository.findByUserId(user.getId()).stream()
                .mapToInt(Booking::getNumberOfTickets).sum();
        
        System.out.println("Booked Ticket - "+event.getBookedTicket());
        System.out.println("Event Capacity Ticket - "+event.getCapacity());
        
        if (event.getBookedTicket() + numberOfTickets > event.getCapacity()) {
            throw new Exception("Not enough tickets available");
        }
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setNumberOfTickets(numberOfTickets);
        booking.setBookingTime(LocalDateTime.now());

        booking = bookingRepository.save(booking);
        
        eventService.updateSeatOfEvent(event, numberOfTickets);
        
        System.out.println("Available Ticket - "+event.getAvailableTicket());
        System.out.println("Booked Ticket - "+event.getBookedTicket());
        List<Ticket> tickets = new ArrayList<>();
        
        for (int i = 0; i < numberOfTickets; i++) {
            Ticket ticket = new Ticket();
            ticket.setBooking(booking);
            ticket.setCheckedIn(false);
            ticket.setIssuedAt(LocalDateTime.now());
            ticket.setQrCode(generateQrCode());
            tickets.add(ticket);
        }
        
        ticketRepository.saveAll(tickets);
        
       booking.setTickets(tickets);
       
        return bookingRepository.save(booking).getBookingDto();
    }

    private String generateQrCode(){
        return UUID.randomUUID().toString();
    }
    
    public List<BookingDto> getBookingsByUser(User user) {
        List<Booking> bookings = bookingRepository.findByUserId(user.getId());

        return bookings.stream()
		               .map(Booking::getBookingDto) 
		               .collect(Collectors.toList());
    }
 
}