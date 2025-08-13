package com.sunbeam.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersDto {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	@NotBlank(message = "first name is required")
	private String firstName;
	@NotBlank(message = "last name is required")
	private String lastName;
	@NotBlank
	@Email(message = "invalid email format")
	private String email;
	@NotBlank(message = "phone number is required")
	@Pattern(regexp = "[789]\\d{9}", message = "Phone must start with 7/8/9 and be 10 digits")
	private String phoneNumber;
	
	@JsonProperty(access = Access.READ_ONLY)
	List<PropertyDto> properties;
}
