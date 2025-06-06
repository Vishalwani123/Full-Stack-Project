package com.example.services.admin;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.example.dto.BidDTO;
import com.example.dto.CarDTO;
import com.example.dto.SearchCarDTO;
import com.example.entities.Bid;
import com.example.entities.Car;
import com.example.enums.BidStatus;
import com.example.repositories.BidRepository;
import com.example.repositories.CarRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
	
	private final CarRepository carRepository;
	
	private final BidRepository bidRepository;

	@Override
	public List<CarDTO> getAllCars() {
		// TODO Auto-generated method stub
		return carRepository.findAll().stream().map(Car::getCarDTO).collect(Collectors.toList());
	}

	@Override
	public CarDTO getCarById(Long id) {
		Optional<Car> optionalCar = carRepository.findById(id);
		return optionalCar.map(Car::getCarDTO).orElse(null);
	}

	@Override
	public void deleteCar(Long id) {
		carRepository.deleteById(id);
	}
	
	@Override
	public List<CarDTO> searchCar(SearchCarDTO searchCarDTO) {
		
		Car car = new Car();
		car.setType(searchCarDTO.getType());
		car.setColor(searchCarDTO.getColor());
		car.setBrand(searchCarDTO.getBrand());
		car.setTransmission(searchCarDTO.getTransmission());
		
		ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
				.withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
				.withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
		Example<Car> carExample = Example.of(car, exampleMatcher);
		List<Car> cars = carRepository.findAll(carExample);
		
		return cars.stream().map(Car::getCarDTO).collect(Collectors.toList());
	}

	@Override
	public List<BidDTO> getBids() {
		return bidRepository.findAll().stream().map(Bid::getBidDTO).collect(Collectors.toList());
	}

	@Override
	public boolean changeBidStatus(Long bidId, String status) {
		Optional<Bid> optionalBid = bidRepository.findById(bidId);
		
		if(optionalBid.isPresent()) {
			Bid bid = optionalBid.get();
			if(Objects.equals(status, "APPROVED")) 
				bid.setBidStatus(BidStatus.APPROVED);
			else
				bid.setBidStatus(BidStatus.REJECTED);
			
			bidRepository.save(bid);
			
			return true;
		}
		return false;
	}
}
