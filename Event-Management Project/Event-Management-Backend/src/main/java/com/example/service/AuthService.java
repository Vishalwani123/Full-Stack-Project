package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.AuthenticationRequest;
import com.example.dto.AuthenticationResponse;
import com.example.dto.SignUpRequest;
import com.example.dto.UserDto;
import com.example.entities.Role;
import com.example.entities.User;
import com.example.exception.UnAuthorizedException;
import com.example.repository.UserRepository;
import com.example.security.AuthUtility;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {
	
		@Autowired
	    private UserRepository userRepository;

		@Autowired
	    private PasswordEncoder passwordEncoder;
		
		@Autowired
	    private AuthUtility jwtUtil;
		
		public UserDto signup(SignUpRequest signupRequest) {
			User user = new User();
			
			user.setUsername(signupRequest.getUsername());
			user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
			user.setEmail(signupRequest.getEmail());
			user.setRole(Role.valueOf(signupRequest.getRole().toUpperCase()));

			return userRepository.save(user).getUserDTO();
		}
		
		public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {

			boolean res = this.validateCredentials(authenticationRequest.getEmail(), authenticationRequest.getPassword());
			
			if(!res) {
				throw new UnAuthorizedException("Entered wrong credentials");
			}
			
			Optional<User> user  = userRepository.findByEmail(authenticationRequest.getEmail());
			
			final String jwt = jwtUtil.generateToken(authenticationRequest.getEmail(), authenticationRequest.getPassword(), user.get().getRole().toString());
			
			AuthenticationResponse response = new AuthenticationResponse();
			
			response.setJwt(jwt);
			response.setRole(user.get().getRole());
			response.setUserName(user.get().getUsername());
			response.setUserId(user.get().getId());
			
			return response;
		}
		
		public Boolean hasUserWithEmail(String email) {
			
			return userRepository.findByEmail(email).isPresent();
		}
		
		public boolean validateCredentials(String email, String password){
		
			Optional<User> user  = userRepository.findByEmail(email);
	        
			boolean matches = passwordEncoder.matches(password, user.get().getPassword());
			if (matches) {
				return true;
			} 
			
			return false;
		}
		
}