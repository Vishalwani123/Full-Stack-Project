package com.example.dto;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDto {
	
	private Long id;
	
	private Long userId;

    private String title;
    		
    private String description;

    private String location;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private int capacity;
 
    private MultipartFile img;
    
}
