package com.sunbeam.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateUserDTO {
	 private String firstName;
	    private String lastName;
	    private String email;
	    private String phoneNumber;
	    private String password;
	    private LocalDate dob;

}
