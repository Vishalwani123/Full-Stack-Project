package com.example.dto;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String brand;
	
	private String type;
	
	private String transmission;
	
	private String color;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate year;
	
    
	private Boolean sold;
	
	private String description;
	
	private MultipartFile img;
	
	private Long userId;
	
	private byte[] returnedImg;
	
	private Long price;
	
}	
