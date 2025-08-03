package com.sunbeam.controller;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.UserDTO;
import com.sunbeam.services.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@Validated
@AllArgsConstructor
public class UserController {
	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> RegisterUser( @RequestBody @Valid UserDTO userDTO){
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(userDTO));
		
		
	}

}
