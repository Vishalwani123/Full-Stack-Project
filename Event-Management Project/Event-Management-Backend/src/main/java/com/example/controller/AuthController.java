package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.AuthenticationRequest;
import com.example.dto.AuthenticationResponse;
import com.example.dto.SignUpRequest;
import com.example.dto.UserDto;
import com.example.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
    private AuthService authService;
    
    @PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignUpRequest signupRequest){
		if(authService.hasUserWithEmail(signupRequest.getEmail()))
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exist");
		
		UserDto userDTO = authService.signup(signupRequest);
		
		if(userDTO == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
	}
    
    @PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
			
			AuthenticationResponse response = authService.login(authenticationRequest);
			return ResponseEntity.ok(response);
	}

}