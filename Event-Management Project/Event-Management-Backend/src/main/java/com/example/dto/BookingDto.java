package com.example.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDto {
	
	private Long id;
    private String username;
    private String eventTitle;
    private int numberOfTickets;
    private LocalDateTime bookingTime;
    private List<String> qrCodes;
    
}
