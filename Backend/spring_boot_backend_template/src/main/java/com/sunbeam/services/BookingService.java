package com.sunbeam.services;

import java.util.List;

import com.sunbeam.entities.Booking;


public interface BookingService {
	boolean addToBooking(Long userId, Long propertyId);
    boolean removeFromBooking(Long userId, Long propertyId);
    List<Booking> getBookingByUser(Long userId);

}
