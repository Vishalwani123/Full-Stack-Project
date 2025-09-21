package com.example.dto;

import com.example.entities.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
	
	private String jwt;
	
	private Long userId;
	
	private String userName;
	
	private Role role;
}
