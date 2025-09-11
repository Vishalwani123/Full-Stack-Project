package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.config.JwtUtil;
import com.example.dto.AuthenticationRequest;
import com.example.dto.AuthenticationResponse;
import com.example.dto.SignUpRequest;
import com.example.dto.UserDto;
import com.example.repository.UserRepository;
import com.example.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
    private AuthService authService;
	
	@Autowired
    private AuthenticationManager authenticationManager;
    
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private JwtUtil jwtUtil;
	
    
    @PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignUpRequest signupRequest){
		System.out.println("Working api of Signup ..........");
		if(authService.hasUserWithUsername(signupRequest.getUsername()))
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exist");
		
		UserDto userDTO = authService.signup(signupRequest);
		
		if(userDTO == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
	}
    
    @PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
			System.out.println("Working api of login ..........");

			AuthenticationResponse response = authService.login(authenticationRequest);

			return ResponseEntity.ok(response);
	}
}
