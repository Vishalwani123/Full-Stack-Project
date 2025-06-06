package com.example.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.EventDto;
import com.example.model.Event;
import com.example.service.EventService;



@RestController
@RequestMapping("/api/events")
@CrossOrigin("*")
public class EventController {
	
	@Autowired
    private EventService eventService;
	
	private static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
	private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList("image/jpeg", "image/png", "image/gif");


    @PostMapping("/save")
    public ResponseEntity<?> createEvent(@ModelAttribute EventDto eventDto) throws IOException {
    	
    	if (eventDto.getImg() != null && eventDto.getImg().getSize() > MAX_IMAGE_SIZE) {
            return ResponseEntity.badRequest().body("Image size exceeds the maximum limit of 5 MB.");
        }
    	
    	if (eventDto.getImg() != null) {
            String contentType = eventDto.getImg().getContentType();
            if (!ALLOWED_IMAGE_TYPES.contains(contentType)) {
                return ResponseEntity.badRequest().body("Invalid image type. Allowed types are: JPEG, PNG, GIF.");
            }
        }
        
        EventDto created = eventService.createEvent(eventDto);
        return ResponseEntity.ok(created);
    }

    
    @GetMapping("/getall")
    public ResponseEntity<List<Event>> getAllEvents(){
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id){
        Optional<Event> event = eventService.getEventById(id);
        if(event.isPresent()){
            return ResponseEntity.ok(event.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @ModelAttribute EventDto eventDto) throws IOException {
        Optional<Event> existing = eventService.getEventById(id);

    	if(existing.isPresent()) {
    		Event event = existing.get();
            EventDto saved = eventService.updateEvent(event, eventDto);
            return ResponseEntity.ok(saved);
        } 
    	else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }
    
}
