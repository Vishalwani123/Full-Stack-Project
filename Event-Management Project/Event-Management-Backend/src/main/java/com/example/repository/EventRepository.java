package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dto.EventDto;
import com.example.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{

}
