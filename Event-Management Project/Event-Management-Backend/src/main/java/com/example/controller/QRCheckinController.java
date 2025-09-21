package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Ticket;
import com.example.service.QRCheckinService;

@RestController
@RequestMapping("/api/qrcheckin")
@CrossOrigin("*")
public class QRCheckinController {
	
	@Autowired
    private QRCheckinService qrCheckinService;

    @PostMapping
    public ResponseEntity<?> checkIn(@RequestParam("code") String qrCode) {
        try {
            Ticket ticket = qrCheckinService.verifyAndCheckInTicket(qrCode);
            return ResponseEntity.ok("Check-in successful for ticket: " + ticket.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }   
    }
    
}