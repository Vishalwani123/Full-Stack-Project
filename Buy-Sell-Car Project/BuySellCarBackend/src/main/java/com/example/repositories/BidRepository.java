package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long>{

	List<Bid> findAllByUserId(Long userId);

	List<Bid>  findAllByCarId(Long carId);

}
  