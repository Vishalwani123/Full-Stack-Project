package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>{
	
	Optional<Ticket> findByQrCode(String qrCode);
	
}