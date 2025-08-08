package com.sunbeam.controller;


import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.UserBookingDto;
import com.sunbeam.entities.Booking;
import com.sunbeam.services.BookingService;

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
    public ResponseEntity<?> removeFromBooking(Authentication authentication, @PathVariable Long propertyId) {
    	bookingService.removeFromBooking(getCurrentUserId(authentication), propertyId);
        return ResponseEntity.ok("Removed from Booking");
    }

    @GetMapping
    public ResponseEntity<List<UserBookingDto>> getBookings(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        List<Booking> list = bookingService.getBookingByUser(userId);

        List<UserBookingDto> dtoList = list.stream().map(booking -> {
            UserBookingDto dto = modelMapper.map(booking.getProperty(), UserBookingDto.class);
            dto.setBookedAt(booking.getBookedAt()); // set bookedAt from Booking entity
            dto.setCategoryTitle(booking.getProperty().getCategory().getTitle());
            dto.setPropertyId(booking.getProperty().getId());
            return dto;
        }).toList();

        return ResponseEntity.ok(dtoList);
    }
    
    @PutMapping("/{propertyId}/{date}")
    public ResponseEntity<?> updateBookingDate(
            Authentication authentication,
            @PathVariable Long propertyId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        Long userId = getCurrentUserId(authentication);
        bookingService.updateBookingDate(userId, propertyId, date);
        return ResponseEntity.ok("Booking date updated");
    }

}
