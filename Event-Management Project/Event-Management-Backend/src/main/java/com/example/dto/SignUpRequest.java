package com.example.dto;

import com.example.entities.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
	
	private String username;
    
    private String password;

    private String email;

    private String role;
    
}
