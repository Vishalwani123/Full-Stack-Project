package com.example.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.entities.User;
import com.example.repository.UserRepository;
import com.example.service.AuthService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class AuthUtility {
	
	@Value("${secret.password}")
	String secretPassword;
	
	Long expirationTime = 86400000L;
	UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
	@Autowired
    public AuthUtility(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

	private Key getSigningKey() {
		byte[] ketBytes = Decoders.BASE64.decode(secretPassword);
		return  Keys.hmacShaKeyFor(ketBytes);
	}
	
	public String generateToken(String email, String password, String role){
		
		String payload = email + ":" + password + ":" + role;
		
		String jwtToken = Jwts.builder()
							.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
							.setIssuedAt(new Date())
							.signWith(getSigningKey(), SignatureAlgorithm.HS256)
							.setSubject(payload)
							.compact();
	
		return jwtToken;
	}
	
	public String decryptJwtToken(String token){
        String payload = Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return payload;
    }
	
	public boolean validateToken(String token){
        String payload = this.decryptJwtToken(token);
        String [] details = payload.split(":");
        String email = details[0];
        String password = details[1];
        return this.validateCredentials(email, password);
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