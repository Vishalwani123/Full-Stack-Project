package com.example.dto;

import com.example.enums.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
	
	private String jwt;
	
	private Long userId;
	
	private String username;
	
	private UserRole userRole;
}
