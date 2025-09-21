package com.example.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
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
import com.example.entities.Booking;
import com.example.entities.Event;
import com.example.entities.Ticket;
import com.example.entities.User;
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
    public ResponseEntity<?> bookTickets(@AuthenticationPrincipal User user,
                                         @PathVariable Long id,
                                         @RequestBody Map<String, Integer> requestBody) {
        try {
            String email = user.getEmail();
            Optional<User> userOpt = userRepository.findByEmail(email);
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
            
            return ResponseEntity.status(HttpStatus.CREATED).body(bookingDto);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
            
        }
    }
    
    @GetMapping("/user/tickets")
    public ResponseEntity<?> getUserTickets(@AuthenticationPrincipal User user) {
        try {
            String email = user.getEmail();
            
            Optional<User> userOpt = userRepository.findByEmail(email);
            
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(401).body("User not found");
            }

            List<BookingDto> bookingDto = bookingService.getBookingsByUser(userOpt.get());
            
            return ResponseEntity.ok(bookingDto);
            
        } 
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
            
        }
    }
  
}