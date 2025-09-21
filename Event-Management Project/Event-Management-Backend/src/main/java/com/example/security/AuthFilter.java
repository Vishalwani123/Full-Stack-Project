package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.entities.User;
import com.example.repository.UserRepository;

import java.io.IOException;
import java.util.Collections;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter extends OncePerRequestFilter{
	
	@Autowired
    private AuthUtility authUtility;
	
	@Autowired
	private UserRepository userRepository;
	
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    	String bearerToken = request.getHeader("Authorization");
    
        if(bearerToken != null && bearerToken.startsWith("Bearer ")){
        	
            String token = bearerToken.substring(7);
            boolean isValid = authUtility.validateToken(token);
            
            if(isValid == false){
                filterChain.doFilter(request, response);
                return;
            }
            
            String payload = authUtility.decryptJwtToken(token);
            String[] parts = payload.split(":"); 
            String email = parts[0];
            String role = parts[2];
            
            User user = userRepository.findByEmail(email).orElseThrow();
            
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            
        }
	        
        filterChain.doFilter(request, response);
    }
	
}