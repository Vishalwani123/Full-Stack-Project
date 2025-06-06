package com.example.services.admin;

import java.util.List;

import com.example.dto.BidDTO;
import com.example.dto.CarDTO;
import com.example.dto.SearchCarDTO;

public interface AdminService {

	List<CarDTO> getAllCars();
	
	CarDTO getCarById(Long id);
	
	void deleteCar(Long id);

	List<CarDTO> searchCar(SearchCarDTO searchCarDTO);
	
	List<BidDTO> getBids();
	
	boolean changeBidStatus(Long bidId, String status);

}
