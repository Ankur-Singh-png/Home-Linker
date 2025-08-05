package com.sunbeam.controller;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import main.java.com.sunbeam.dto.UpdateUserDTO;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/user")
@Validated
@AllArgsConstructor
@CrossOrigin
public class UserController {
	private UserService userService;
	private AuthenticationManager authManager;
	private JwtUtil jwtUtil;
	
	@PostMapping("/signup")
	public ResponseEntity<?> RegisterUser( @RequestBody @Valid UserDTO userDTO){
		System.out.println(userDTO);
		//ApiResponse<UserDTO> response = new ApiResponse<>("success", "User registered successfully", userService.signUp(userDTO));
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(userDTO));	
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> LoginUser( @RequestBody AuthRequest authDTO){
		Authentication auth = new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword());
		System.out.println("BEFORE AUTH: " + auth + auth.isAuthenticated() + auth.getPrincipal().getClass());
		auth = authManager.authenticate(auth);
		System.out.println("AFTER AUTH: " + auth + auth.isAuthenticated() + auth.getPrincipal().getClass());

        System.out.println("Creating token");
		String token = jwtUtil.createToken(auth);
		System.out.println("Token created");
		return ResponseEntity.ok(token);
	}
	
	@GetMapping("/get")
	public String getString() {
		return "yash";
	}


	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
		return ResponseEntity.ok(userService.getUserDTOById(id));
	}

	  @PutMapping("/{id}")
	   public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateUserDTO updateDTO) {
	       userService.updateUserFromDTO(id, updateDTO);
	       return ResponseEntity.ok("User updated successfully");
	   }

}
