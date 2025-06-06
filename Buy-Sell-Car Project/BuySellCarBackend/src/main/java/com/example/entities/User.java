package com.example.entities;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.dto.UserDTO;
import com.example.enums.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User implements UserDetails{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String email;
	
	private String password;
	
	private UserRole userRole;

	public UserDTO  getUserDTO() {
		
		UserDTO userDTO = new UserDTO();
		
		userDTO.setId(id);
		userDTO.setName(name);
		userDTO.setEmail(email);
		userDTO.setUserRole(userRole);
		
		return userDTO;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(userRole.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	
    @Override
    public boolean isCredentialsNonExpired() {
    	// TODO Auto-generated method stub
    	return true;
    }
    
    @Override
    public boolean isEnabled() {
    	// TODO Auto-generated method stub
    	return true;
    }
	
}
