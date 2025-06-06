package com.example.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.BidDTO;
import com.example.dto.CarDTO;
import com.example.dto.SearchCarDTO;
import com.example.services.admin.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
//@CrossOrigin("*")
public class AdminController {
	
	private final AdminService adminService;
	
	@GetMapping("/cars")
	public ResponseEntity<List<CarDTO>> getAllCars(){
		System.out.println("GetAll work for Admin");
		return ResponseEntity.ok(adminService.getAllCars());
	}
	
	@GetMapping("/car/{id}")
	public ResponseEntity<CarDTO> getCarById(@PathVariable Long id){
		System.out.println("GetById work for Admin");
		return ResponseEntity.ok(adminService.getCarById(id));
	}
	
	@DeleteMapping("/car/{id}")
	public ResponseEntity<Void> deleteCar(@PathVariable Long id){
		System.out.println("deleteById work for Admin");
		adminService.deleteCar(id);
		return ResponseEntity.ok(null);
	}
	
	@PostMapping("/car/search")
	public ResponseEntity<List<CarDTO>> searchCar(@RequestBody SearchCarDTO searchCarDTO){
		System.out.println("Search work for Admin");
		return ResponseEntity.ok(adminService.searchCar(searchCarDTO));
	}
	
	@GetMapping("/car/bids")
	public ResponseEntity<List<BidDTO>> getBids(){
		System.out.println("GetBids work for Admin");
		return ResponseEntity.ok(adminService.getBids());
	}
	
	@GetMapping("/car/bid/{bidId}/{status}")
	public ResponseEntity<?> changeBidStatus(@PathVariable Long bidId, @PathVariable String status){
		System.out.println("changeBidStatus work for Admin");
		boolean success = adminService.changeBidStatus(bidId, status);
		if(success) return ResponseEntity.ok().build();
		return ResponseEntity.notFound().build();
		
	}
}
