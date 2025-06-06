package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.model.Booking;
import com.example.model.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
	
	List<Booking> findByUserId(Long userId);
	
}
