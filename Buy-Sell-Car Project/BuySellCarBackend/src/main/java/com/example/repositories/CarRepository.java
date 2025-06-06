package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.entities.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{

	List<Car> findAllByUserId(Long userId);

	Long countByUserId(Long userId);

	Long countByUserIdAndSoldTrue(Long userId);
	
}
