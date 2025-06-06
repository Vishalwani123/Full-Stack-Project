package com.example.dto;

import com.example.enums.BidStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter	
public class BidDTO {
	
	private Long id;
	
	private Long price;
	
	private BidStatus bidStatus;
	
	private Long userId;
	
	private Long carId;
	
	private String username;
	
	private String carName;
	
	private String carBrand;
	
	private String email;
	
	private String sellerName ;
	
	
}
