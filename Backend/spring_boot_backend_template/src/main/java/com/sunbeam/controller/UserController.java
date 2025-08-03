package com.sunbeam.controller;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AuthRequest;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.jwt.JwtUtil;
import com.sunbeam.services.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/user")
@Validated
@AllArgsConstructor
public class UserController {
	private UserService userService;
	private AuthenticationManager authManager;
	private JwtUtil jwtUtil;
	
	@PostMapping("/signup")
	public ResponseEntity<?> RegisterUser( @RequestBody @Valid UserDTO userDTO){
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(userDTO));	
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> LoginUser( @RequestBody AuthRequest authDTO){
		Authentication auth = new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword());
		System.out.println("BEFORE AUTH: " + auth);
		auth = authManager.authenticate(auth);
		System.out.println("AFTER AUTH: " + auth);
		// after authentication, create JWT token and return.
		String token = jwtUtil.createToken(auth);
		return ResponseEntity.ok(token);
	}
	
	@GetMapping("/get")
	public String getString() {
		return "yash";
	}

}
