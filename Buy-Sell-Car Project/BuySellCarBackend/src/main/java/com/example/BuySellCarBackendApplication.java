package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.example.entities")
public class BuySellCarBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BuySellCarBackendApplication.class, args);
	}
}
