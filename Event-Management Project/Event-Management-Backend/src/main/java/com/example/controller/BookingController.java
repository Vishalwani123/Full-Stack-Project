package com.example.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.BookingDto;
import com.example.model.Booking;
import com.example.model.Event;
import com.example.model.Ticket;
import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.service.BookingService;
import com.example.service.EventService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {
	
	@Autowired
    private BookingService bookingService;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{id}")
    public ResponseEntity<?> bookTickets(@AuthenticationPrincipal UserDetails userDetails,
                                         @PathVariable Long id,
                                         @RequestBody Map<String, Integer> requestBody) {
    	System.out.println(" Book Ticket Controller is Working fine ");
        try {
        	
            String username = userDetails.getUsername();
            Optional<User> userOpt = userRepository.findByUsername(username);
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(401).body("User not found");
            }
            
            Optional<Event> eventOpt = eventService.getEventById(id);
            if (!eventOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Invalid event ID");
            }
            
            Integer tickets = requestBody.get("ticket");
            if (tickets == null) {
                return ResponseEntity.badRequest().body("Missing 'ticket' in request body");
            }
            
            BookingDto bookingDto = bookingService.createBooking(userOpt.get(), eventOpt.get(), tickets);
            
            System.out.println(" Booking Ticket is done ");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(bookingDto);
            
        } catch (Exception e) {
        	
            return ResponseEntity.badRequest().body(e.getMessage());
            
        }
    }
    
    @GetMapping("/user/tickets")
    public ResponseEntity<?> getUserTickets(@AuthenticationPrincipal UserDetails userDetails) {
        try {
        	
            String username = userDetails.getUsername();
            Optional<User> userOpt = userRepository.findByUsername(username);
            
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(401).body("User not found");
            }

            List<BookingDto> bookingDto = bookingService.getBookingsByUser(userOpt.get());

            return ResponseEntity.status(HttpStatus.FOUND).body(bookingDto);
            
        } 
        catch (Exception e) {
        	
            return ResponseEntity.badRequest().body(e.getMessage());
            
        }
    }

    
}


