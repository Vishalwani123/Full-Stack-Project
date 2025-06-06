package com.example.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.dto.EventDto;
import com.example.model.Event;
import com.example.repository.EventRepository;

@Service
public class EventService {
	
	@Autowired
    private EventRepository eventRepository;

    public EventDto createEvent(EventDto eventDto) throws IOException{
    	Event event = new Event();
    	event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setLocation(eventDto.getLocation());
        event.setStartTime(eventDto.getStartTime());
        event.setEndTime(eventDto.getEndTime());
        event.setCapacity(eventDto.getCapacity());
        
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

    
    public EventDto updateEvent(Event event, EventDto eventDto) throws IOException{
     event.setTitle(eventDto.getTitle());
     event.setDescription(eventDto.getDescription());
     event.setLocation(eventDto.getLocation());
     event.setStartTime(eventDto.getStartTime());
     event.setEndTime(eventDto.getEndTime());
     event.setCapacity(eventDto.getCapacity());
     
     if(eventDto.getImg() != null) {
     	event.setImg(eventDto.getImg().getBytes());
	}
    	
       return eventRepository.save(event).getEventDto();	 
    }
    
    
    public void deleteEvent(Long id){
        eventRepository.deleteById(id);
    }
    
}
