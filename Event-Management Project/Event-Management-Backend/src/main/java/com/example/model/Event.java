package com.example.model;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import com.example.dto.EventDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    		
    private String description;

    private String location;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private int capacity;
    
    @Lob
	private byte[] img;

	public EventDto getEventDto() {
		
		EventDto eventDto = new EventDto();
		
		eventDto.setId(id);
		eventDto.setTitle(title);
		eventDto.setDescription(description);
		eventDto.setLocation(location);
		eventDto.setStartTime(startTime);
		eventDto.setEndTime(endTime);
		eventDto.setCapacity(capacity);
		
		return eventDto;
	}
    
}

