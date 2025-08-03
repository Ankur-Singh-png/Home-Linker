package com.sunbeam;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication 
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

    @Bean
    ModelMapper modelMapper() {
		System.out.println("in model mapper creation");
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
				
				.setMatchingStrategy(MatchingStrategies.STRICT)
				//Only map a property from source to destination if the source value is NOT null.
				.setPropertyCondition(Conditions.isNotNull());
		return mapper;

	}
    
//    @Bean
//	PasswordEncoder passwordEncoder()
//	{
//		return new BCryptPasswordEncoder();
//	}

}
