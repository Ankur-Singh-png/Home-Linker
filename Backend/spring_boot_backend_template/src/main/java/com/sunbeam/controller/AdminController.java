package com.sunbeam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.services.BookingService;
import com.sunbeam.services.ContactUsService;
import com.sunbeam.services.UserService;
import com.sunbeam.services.WishListService;

import java.util.*;
import com.sunbeam.dto.*;
import com.sunbeam.entities.Booking;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@AllArgsConstructor
public class AdminController {
	private UserService userService;
	private final ContactUsService contactService;
	
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashBoard() {
		System.out.println("in admin");
		List<UserDTO> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}
	
	@GetMapping("/getQuery")
	public ResponseEntity<?> getQueries(){
		contactService.getAllQueries().stream().forEach(c -> System.out.println(c));
		return ResponseEntity.status(HttpStatus.CREATED).body(contactService.getAllQueries());
	}

}
