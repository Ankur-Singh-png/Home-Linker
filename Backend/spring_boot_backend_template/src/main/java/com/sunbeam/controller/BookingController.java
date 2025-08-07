package com.sunbeam.controller;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.BookingDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.PropertyDto;
import com.sunbeam.entities.Booking;
import com.sunbeam.entities.WishList;
import com.sunbeam.services.BookingService;
import com.sunbeam.services.WishListService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/booking")
@AllArgsConstructor
public class BookingController {
	private final ModelMapper modelMapper;
    private BookingService bookingService;
    private UserDao userDao;
	
    private Long getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        return userDao.findByEmail(email).orElseThrow(() -> new ApiException("User not found")).getId();
    }

    @PostMapping("/{propertyId}")
    public ResponseEntity<?> addToBooking(Authentication authentication, @PathVariable Long propertyId) {
    	bookingService.addToBooking(getCurrentUserId(authentication), propertyId);
        return ResponseEntity.ok("Added to Booking");
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<?> removeFromWishlist(Authentication authentication, @PathVariable Long propertyId) {
    	bookingService.removeFromBooking(getCurrentUserId(authentication), propertyId);
        return ResponseEntity.ok("Removed from Booking");
    }

    @GetMapping
    public ResponseEntity<List<PropertyDto>> getWishlist(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        List<Booking> list = bookingService.getBookingByUser(userId);
       
       List<PropertyDto> dto =list.stream().map(property-> modelMapper.map(property, PropertyDto.class)).toList();
        
        return ResponseEntity.ok(dto);
    }

}
