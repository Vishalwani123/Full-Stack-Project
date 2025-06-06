package com.example.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.example.dto.BidDTO;
import com.example.enums.BidStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Bid {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long price;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "car_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Car car;
	
	private BidStatus bidStatus;
	
	public BidDTO getBidDTO() {
		BidDTO bid = new BidDTO();
		
		bid.setId(id);
		bid.setPrice(price);
		bid.setCarId(car.getId());
		bid.setCarName(car.getName());
		bid.setCarBrand(car.getBrand());
		bid.setBidStatus(bidStatus);
		bid.setEmail(user.getEmail());
		bid.setUsername(user.getName());
		bid.setSellerName(car.getUser().getName());
		
		return bid;
	}
	
}
