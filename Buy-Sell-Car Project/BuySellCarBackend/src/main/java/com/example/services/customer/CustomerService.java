package com.example.services.customer;

import java.io.IOException;
import java.util.List;

import com.example.dto.AnalyticsDTO;
import com.example.dto.BidDTO;
import com.example.dto.CarDTO;
import com.example.dto.SearchCarDTO;

public interface CustomerService {
	
	boolean createCar(CarDTO carDTO) throws IOException;
	
	boolean updateCar(Long id, CarDTO carDTO) throws IOException;
	
	boolean bidCar(BidDTO bidDTO);
	
	List<CarDTO> getAllCars();
	
	List<CarDTO> getMyCars(Long userId);

	CarDTO getCarById(Long id);

	void deleteCar(Long id); 
	
	List<CarDTO> searchCar(SearchCarDTO searchCarDTO);
	
	List<BidDTO> getBidsByUserId(Long userId);
	
	List<BidDTO> getBidsByCarId(Long carId);
	
	boolean changeBidStatus(Long bidId, String status);
	
	AnalyticsDTO getAnalytics(Long userId);
}
