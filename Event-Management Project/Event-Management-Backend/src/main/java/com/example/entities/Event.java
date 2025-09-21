package com.example.entities;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import com.example.dto.EventDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
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
    
    private int availableTicket;

    private int bookedTicket;
    
    @Lob
	private byte[] img;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

	public EventDto getEventDto() {
		
		EventDto eventDto = new EventDto();
		
		eventDto.setId(id);
		eventDto.setUserId(user.getId());
		eventDto.setTitle(title);
		eventDto.setDescription(description);
		eventDto.setLocation(location);
		eventDto.setStartTime(startTime);
		eventDto.setEndTime(endTime);
		eventDto.setCapacity(capacity);
		return eventDto;
		
	}
	
}

