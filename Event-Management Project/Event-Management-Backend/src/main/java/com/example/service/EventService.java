package com.example.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.EventDto;
import com.example.entities.Event;
import com.example.entities.User;
import com.example.repository.EventRepository;

@Service
public class EventService {
	
	@Autowired
    private EventRepository eventRepository;

    public EventDto createEvent(User user, EventDto eventDto) throws IOException{
    	Event event = new Event();
    	event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setLocation(eventDto.getLocation());
        event.setStartTime(eventDto.getStartTime());
        event.setEndTime(eventDto.getEndTime());
        event.setCapacity(eventDto.getCapacity());
        event.setAvailableTicket(eventDto.getCapacity());
        event.setBookedTicket(0);
        event.setUser(user);
        
        if (eventDto.getImg() != null) {
            event.setImg(eventDto.getImg().getBytes());
        }
        
        return eventRepository.save(event).getEventDto();

    }
    

    public List<Event> getAllEvents(){
    	return eventRepository.findAll();
    }
    
    public Optional<Event> getEventById(Long id){
        return eventRepository.findById(id);
    }	
    
    public Optional<List<Event>> getEventByUserId(Long userId){
    	System.out.println("Inside service of getEventByUserId");
        return eventRepository.findByUserId(userId);
    }
    
    public EventDto updateEvent(Event event, EventDto eventDto) throws IOException{
	     event.setTitle(eventDto.getTitle());
	     event.setDescription(eventDto.getDescription());
	     event.setLocation(eventDto.getLocation());
	     event.setStartTime(eventDto.getStartTime());
	     event.setEndTime(eventDto.getEndTime());
	     event.setCapacity(event.getCapacity() + eventDto.getCapacity());
	     event.setAvailableTicket(event.getAvailableTicket() + eventDto.getCapacity());
	     event.setBookedTicket(event.getBookedTicket());
	     
	     if(eventDto.getImg() != null) {
	     	event.setImg(eventDto.getImg().getBytes());
	     }
	     
	     return eventRepository.save(event).getEventDto();	 
    }
    
    public void updateSeatOfEvent(Event event, int numberOfTickets) {
    	event.setAvailableTicket(event.getAvailableTicket() - numberOfTickets);
        event.setBookedTicket(event.getBookedTicket()+numberOfTickets);
        eventRepository.save(event);
    }
    
    public void deleteEvent(Long id){
        eventRepository.deleteById(id);
    }

}