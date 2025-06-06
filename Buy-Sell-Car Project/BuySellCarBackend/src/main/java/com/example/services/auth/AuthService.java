package com.example.services.auth;

import com.example.dto.SignupRequest;
import com.example.dto.UserDTO;

public interface AuthService {
	
	Boolean hasUserWithEmail(String email);
	
	UserDTO signup(SignupRequest signupRequest);
}
