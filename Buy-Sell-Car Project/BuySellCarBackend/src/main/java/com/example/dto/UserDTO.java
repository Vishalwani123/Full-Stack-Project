package com.example.dto;

import com.example.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
		
	private Long id;
	
	private String name;
	
	private String email;
	
	private UserRole userRole;
	
	

}
