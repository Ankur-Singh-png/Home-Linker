package com.sunbeam.dto;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	@NotBlank(message = "first name is required")
	@Length(min =4 , max = 20, message = "invalid length of firstname")
	private String firstName;
	@Length(min = 4, max = 20, message = "invalid length of lastname")
	@NotBlank(message = "last name is required")
	private String lastName;
	@NotBlank
	@Email(message = "invalid email format")
	private String email;
	@NotBlank(message = "phone number is required")
	@Pattern(regexp = "[789]\\d{9}", message = "Phone must start with 7/8/9 and be 10 digits")
	private String phoneNumber;
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String password;
	@Pattern
	(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String confirmPassword;
	@NotNull
	@Past(message = "invalid date")
	private LocalDate dob;

}
