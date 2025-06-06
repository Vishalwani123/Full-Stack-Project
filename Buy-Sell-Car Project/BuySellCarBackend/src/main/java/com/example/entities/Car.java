package com.example.entities;


import java.time.LocalDate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.example.dto.CarDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Car {
	
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
	
	@Lob
	private String description;
	
	@Lob
	private byte[] img;
	
	private Long price;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	public CarDTO getCarDTO(){

		CarDTO carDto = new CarDTO();
		carDto.setId(id);
		carDto.setName(name);
		carDto.setBrand(brand);
		carDto.setType(type);
		carDto.setTransmission(transmission);
		carDto.setColor(color);
		carDto.setYear(year);		
		carDto.setSold(sold);
		carDto.setDescription (description);
		carDto.setPrice(price);
		carDto.setReturnedImg(img);
		
		
		return carDto;
	}
}
