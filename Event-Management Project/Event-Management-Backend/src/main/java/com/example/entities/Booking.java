package com.example.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.example.dto.BookingDto;
import com.example.dto.UserDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    private int numberOfTickets;

    private LocalDateTime bookingTime;
    
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ticket> tickets;

    public BookingDto getBookingDto() {
		
    	BookingDto bookingDto = new BookingDto();
		
    	bookingDto.setId(id);
    	bookingDto.setUsername(user.getUsername());
    	bookingDto.setEventTitle(event.getTitle());
    	bookingDto.setNumberOfTickets(numberOfTickets);   	
    	bookingDto.setBookingTime(bookingTime);
        List<String> qrCodes = tickets.stream().map(Ticket::getQrCode).collect(Collectors.toList());
        bookingDto.setQrCodes(qrCodes);
		
		return bookingDto;
		
	}
    
}