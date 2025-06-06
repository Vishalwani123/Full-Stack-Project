package com.example.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.BidDTO;
import com.example.dto.CarDTO;
import com.example.dto.SearchCarDTO;
import com.example.services.customer.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
//@CrossOrigin("*", allowCredentials = "true")
//@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {
	
	private final CustomerService customerService;
	
	@PostMapping("/car")
	public ResponseEntity<?> addCar(@ModelAttribute CarDTO carDTO) throws Exception {
		System.out.println("Add work for Customer");
		boolean success = customerService.createCar(carDTO);
		if(success) return ResponseEntity.status(HttpStatus.CREATED).build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
	
	@PutMapping("/car/{id}")
	public ResponseEntity<?> updateCar(@PathVariable Long id,  @ModelAttribute CarDTO carDTO) throws Exception {
		System.out.println("Update work for Customer");
		boolean success = customerService.updateCar(id, carDTO);
		if(success) return ResponseEntity.status(HttpStatus.OK).build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
	
	@GetMapping("/cars")
	public ResponseEntity<List<CarDTO>> getAllCars(){
		System.out.println("GetAll work for Customer");
		return ResponseEntity.ok(customerService.getAllCars());
	}
	
	@GetMapping("/car/{id}")
	public ResponseEntity<CarDTO> getCarById(@PathVariable Long id){
		System.out.println("GetById work for Customer");
		return ResponseEntity.ok(customerService.getCarById(id));
	}
	
	@DeleteMapping("/car/{id}")
	public ResponseEntity<Void> deleteCar(@PathVariable Long id){
		System.out.println("deleteById work for Customer");
		customerService.deleteCar(id);
		return ResponseEntity.ok(null);
	}
	
	@PostMapping("/car/search")
	public ResponseEntity<List<CarDTO>> searchCar(@RequestBody SearchCarDTO searchCarDTO){
		System.out.println("Search work for Customer");
		return ResponseEntity.ok(customerService.searchCar(searchCarDTO));
	}
	
	@GetMapping("/mycars/{userId}")
	public ResponseEntity<List<CarDTO>> getMyCars(@PathVariable Long userId){
		System.out.println("MyCars work for Customer");
		return ResponseEntity.ok(customerService.getMyCars(userId));
	}
	
	@PostMapping("/car/bid")
	public ResponseEntity<?> bidCar(@RequestBody BidDTO bidDTO) {
		System.out.println("Bid work for Customer");
		boolean success = customerService.bidCar(bidDTO);
		if(success) return ResponseEntity.status(HttpStatus.CREATED).build();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
	
	@GetMapping("/car/bids/{userId}")
	public ResponseEntity<List<BidDTO>> getBidsByUserId(@PathVariable Long userId){
		System.out.println("Bids for userId work for Customer");
		return ResponseEntity.ok(customerService.getBidsByUserId(userId));
	}

	@GetMapping("/car/{carId}/bids")
	public ResponseEntity<List<BidDTO>> getBidsByCarId(@PathVariable Long carId){
		System.out.println("Bids for carId work for Customer");
		return ResponseEntity.ok(customerService.getBidsByCarId(carId));
	}
	
	@GetMapping("/car/bid/{bidId}/{status}")
	public ResponseEntity<?> changeBidStatus(@PathVariable Long bidId, @PathVariable String status){
		System.out.println("changeBidStatus work for Customer");
		boolean success = customerService.changeBidStatus(bidId, status);
		if(success) return ResponseEntity.ok().build();
		return ResponseEntity.notFound().build();
		
	}
	
	@GetMapping("/car/analytics/{userId}")
	public ResponseEntity<?> getAnalytics(@PathVariable Long userId){
		System.out.println("Analytics for userId work for Customer");
		return ResponseEntity.ok(customerService.getAnalytics(userId));
	}
}
	