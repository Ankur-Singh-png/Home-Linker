package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.services.BookingService;
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
	private BookingService bookingService;
	private WishListService wishListService;
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashBoard() {
		System.out.println("in admin");
		List<UserDTO> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

}
