package com.example.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.BookingDto;
import com.example.model.Booking;
import com.example.model.Event;
import com.example.model.Ticket;
import com.example.model.User;
import com.example.repository.BookingRepository;
import com.example.repository.TicketRepository;

@Service
public class BookingService {
	
	@Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    public BookingDto createBooking(User user, Event event, int numberOfTickets) throws Exception {
        int bookedTickets = bookingRepository.findByUserId(user.getId()).stream()
                .mapToInt(Booking::getNumberOfTickets).sum();

        if (bookedTickets + numberOfTickets > event.getCapacity()) {
            throw new Exception("Not enough tickets available");
        }
        
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setNumberOfTickets(numberOfTickets);
        booking.setBookingTime(LocalDateTime.now());

        booking = bookingRepository.save(booking);

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
