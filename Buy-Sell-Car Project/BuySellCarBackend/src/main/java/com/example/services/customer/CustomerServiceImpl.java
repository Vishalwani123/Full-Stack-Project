package com.example.services.customer;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.example.dto.AnalyticsDTO;
import com.example.dto.BidDTO;
import com.example.dto.CarDTO;
import com.example.dto.SearchCarDTO;
import com.example.entities.Bid;
import com.example.entities.Car;
import com.example.entities.User;
import com.example.enums.BidStatus;
import com.example.repositories.BidRepository;
import com.example.repositories.CarRepository;
import com.example.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import java.util.Base64;
import java.util.Collections;

import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{
	
	private final UserRepository userRepository;
	
	private final CarRepository carRepository;
	
	private final BidRepository bidRepository;
	
	@Override
	public boolean createCar(CarDTO carDTO) throws IOException {
		Optional<User> optionalUser = userRepository.findById(carDTO.getUserId());
		if (optionalUser.isPresent()) {
			Car car = new Car();
			car.setName(carDTO.getName());
			car.setBrand(carDTO.getBrand());
			car.setPrice(carDTO.getPrice());
			car.setDescription (carDTO.getDescription());
			car.setColor(carDTO.getColor());
			car.setTransmission(carDTO.getTransmission());
			car.setType(carDTO.getType());
			car.setSold(false);
			car.setYear(carDTO.getYear());
			car.setImg(carDTO.getImg().getBytes());
			car.setUser(optionalUser.get());
			carRepository.save(car);
			return true;
		}
		return false;
	}

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
	public boolean updateCar(Long id, CarDTO carDTO) throws IOException {
		Optional<Car> optionalCar = carRepository.findById(id);
		if((optionalCar.isPresent())) {
			Car car = optionalCar.get();
			car.setName(carDTO.getName());
			car.setBrand(carDTO.getBrand());
			car.setPrice(carDTO.getPrice());
			car.setDescription (carDTO.getDescription());
			car.setColor(carDTO.getColor());
			car.setTransmission(carDTO.getTransmission());
			car.setType(carDTO.getType());
			car.setYear(carDTO.getYear());
			
			if(carDTO.getImg() != null && !carDTO.getImg().isEmpty()) {
				car.setImg(carDTO.getImg().getBytes());
			}
			carRepository.save(car);
			return true;
		}
		return false;
	}

	@Override
	public List<CarDTO> searchCar(SearchCarDTO searchCarDTO) {
		
		boolean hasSearchCriteria = 
		        (searchCarDTO.getBrand() != null && !searchCarDTO.getBrand().trim().isEmpty()) ||
		        (searchCarDTO.getType() != null && !searchCarDTO.getType().trim().isEmpty()) ||
		        (searchCarDTO.getColor() != null && !searchCarDTO.getColor().trim().isEmpty()) ||
		        (searchCarDTO.getTransmission() != null && !searchCarDTO.getTransmission().trim().isEmpty());


		    if (!hasSearchCriteria) {
		        return Collections.emptyList();
		    }
		    
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
	public List<CarDTO> getMyCars(Long userId) {
		// TODO Auto-generated method stub
		return carRepository.findAllByUserId(userId).stream().map(Car::getCarDTO).collect(Collectors.toList());
	}

	@Override
	public boolean bidCar(BidDTO bidDTO) {
		
		Optional<Car> optionalCar = carRepository.findById(bidDTO.getCarId());
		Optional<User> optionalUser = userRepository.findById(bidDTO.getUserId());
		
		if(optionalCar.isPresent() && optionalUser.isPresent()) {
			
			Bid bid = new Bid();
			bid.setUser(optionalUser.get());
			bid.setCar(optionalCar.get());
			bid.setPrice(bidDTO.getPrice());
			bid.setBidStatus(BidStatus.PENDING);
			
			bidRepository.save(bid);
			
			return true;
		}
		
		return false;
	}

	@Override
	public List<BidDTO> getBidsByUserId(Long userId) {
		return bidRepository.findAllByUserId(userId).stream().map(Bid::getBidDTO).collect(Collectors.toList());
	}

	@Override
	public List<BidDTO> getBidsByCarId(Long carId) {
		return bidRepository.findAllByCarId(carId).stream().map(Bid::getBidDTO).collect(Collectors.toList());
	}

	@Override
	public boolean changeBidStatus(Long bidId, String status) {
		Optional<Bid> optionalBid = bidRepository.findById(bidId);
		
		if(optionalBid.isPresent()) {
			
			Bid bid = optionalBid.get();
			Car car = optionalBid.get().getCar();
			
			if(bid.getCar().getSold()) {
				return false;
			}
			
			if(Objects.equals(status.toUpperCase(), "APPROVED")) {
				bid.setBidStatus(BidStatus.APPROVED);
				car.setSold(true);
			}
			else
				bid.setBidStatus(BidStatus.REJECTED);
			
			bidRepository.save(bid);
			
			return true;
		}
		return false;
	}

	@Override
	public AnalyticsDTO getAnalytics(Long userId) {
		AnalyticsDTO analyticsDTO = new AnalyticsDTO();
		analyticsDTO.setTotalCars(carRepository.countByUserId(userId));
		analyticsDTO.setSoldCars(carRepository.countByUserIdAndSoldTrue(userId));
		return analyticsDTO;
	}
	
	
	
	

}
