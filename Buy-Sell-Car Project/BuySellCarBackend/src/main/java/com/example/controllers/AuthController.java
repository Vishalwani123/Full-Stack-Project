package com.example.controllers;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.AuthenticationRequest;
import com.example.dto.AuthenticationResponse;
import com.example.dto.SignupRequest;
import com.example.dto.UserDTO;
import com.example.entities.User;
import com.example.repositories.UserRepository;
import com.example.services.auth.AuthService;
import com.example.services.jwt.UserService;
import com.example.utils.JWTUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
	
	private final AuthService authService;
	
	private final JWTUtil jwtUtil;
	
	private final UserRepository userRepository;
	
	private final UserService userService;
	
	private final AuthenticationManager authenticationManager;
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest){
		System.out.println("Working api of Signup ..........");
		if(authService.hasUserWithEmail(signupRequest.getEmail())) 
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exist");
		
		UserDTO userDTO = authService.signup(signupRequest);
		
		if(userDTO == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
	}
	
	@PostMapping("/login")
	public AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest) {
		System.out.println("Working api of login ..........");
			try {
				authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(
								authenticationRequest.getEmail(),
								authenticationRequest.getPassword()));
			}
			catch (BadCredentialsException e) {
				throw new BadCredentialsException("Incorrect username or password");
			}

			final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
			Optional<User> optionalUser = userRepository.findFirstByEmail(authenticationRequest.getEmail());
		
			final String jwt = jwtUtil.generateToken (userDetails);
		
			AuthenticationResponse response = new AuthenticationResponse();
			
			if (optionalUser.isPresent()){
				response.setJwt(jwt);
				response.setUserRole(optionalUser.get().getUserRole());
				response.setUsername(optionalUser.get().getName());
				response.setUserId(optionalUser.get().getId());
			}
			
			return response;
	}
}
				
			
		
			
