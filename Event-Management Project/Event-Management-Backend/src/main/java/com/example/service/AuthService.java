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

import com.example.config.JwtUtil;
import com.example.dto.AuthenticationRequest;
import com.example.dto.AuthenticationResponse;
import com.example.dto.SignUpRequest;
import com.example.dto.UserDto;
import com.example.model.Role;
import com.example.model.User;
import com.example.repository.UserRepository;

@Service
public class AuthService {
	
		@Autowired
	    private UserRepository userRepository;

		@Autowired
	    private PasswordEncoder passwordEncoder;
		
		@Autowired
	    private AuthenticationManager authenticationManager;
		
		@Autowired
	    private JwtUtil jwtUtil;
		
		@Autowired
		private CustomUserDetailsService customUserDetailsService;
		 
	    // Sign-up Function 
		public UserDto signup(SignUpRequest signupRequest) {
			
			User user = new User();
			user.setUsername(signupRequest.getUsername());
			user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
			user.setEmail(signupRequest.getEmail());
			user.setRole(Role.valueOf(signupRequest.getRole().toUpperCase()));

			
			return userRepository.save(user).getUserDTO();
		}
		
		// Login  Function
		public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {
			
			try {
				 authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(
								authenticationRequest.getUsername(),
								authenticationRequest.getPassword()));
			}
			catch (BadCredentialsException e) {
				throw new BadCredentialsException("Incorrect username or password");
			}

			final UserDetails userDetails = customUserDetailsService.userDetailsService().loadUserByUsername(authenticationRequest.getUsername());
			Optional<User> optionalUser = userRepository.findByUsername(authenticationRequest.getUsername());
		
			final String jwt = jwtUtil.generateToken(userDetails);
			
			AuthenticationResponse response = new AuthenticationResponse();
			
			if (optionalUser.isPresent()) {
				response.setJwt(jwt);
				response.setRole(optionalUser.get().getRole());
				response.setUserId(optionalUser.get().getId());
			}
			
			return response;
			
		}
		public Boolean hasUserWithUsername(String username) {
			
			return userRepository.findByUsername(username).isPresent();
		}
			
//		public UserDetailsService userDetailsService() {
//			return new UserDetailsService() {
//				
//				@Override
//				public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//					
//					return userRepository.findByUsername(username)
//							.orElseThrow(() -> new UsernameNotFoundException("User not found"));
//				}
//			};
//		}
}
