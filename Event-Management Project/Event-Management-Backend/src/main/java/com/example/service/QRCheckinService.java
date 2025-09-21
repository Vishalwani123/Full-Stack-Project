package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Ticket;
import com.example.repository.TicketRepository;

@Service
public class QRCheckinService {
	
	@Autowired
    private TicketRepository ticketRepository;
	
    public Ticket verifyAndCheckInTicket(String qrCode) throws Exception {
        Optional<Ticket> ticketOptional = ticketRepository.findByQrCode(qrCode);
        if(!ticketOptional.isPresent()){
            throw new Exception("Ticket not found");
        }

        Ticket ticket = ticketOptional.get();
        
        if(ticket.isCheckedIn()){
            throw new Exception("Ticket already checked in");
        }

        ticket.setCheckedIn(true);
        
        ticketRepository.save(ticket);

        return ticket;
    }
    
}