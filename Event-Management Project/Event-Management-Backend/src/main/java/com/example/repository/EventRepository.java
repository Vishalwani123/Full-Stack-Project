package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dto.EventDto;
import com.example.entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
	
	Optional<List<Event>> findByUserId(Long userId);
}