package com.sunbeam.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.BookingDao;
import com.sunbeam.dao.PropertyDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.entities.Booking;
import com.sunbeam.entities.Property;
import com.sunbeam.entities.User;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {
	private BookingDao bookingDao;
    private UserDao userDao;
    private PropertyDao propertyDao;
	@Override
	public boolean addToBooking(Long userId, Long propertyId) {
		if (bookingDao.findByUserIdAndPropertyId(userId, propertyId).isPresent())
            throw new ApiException("Property already in Booking.");
        User user = userDao.findById(userId).orElseThrow(() -> new ApiException("User not found"));
        Property property = propertyDao.findById(propertyId).orElseThrow(() -> new ApiException("Property not found"));
        property.setAvailable(false);
        Booking b = new Booking();
        b.setUser(user);
        b.setProperty(property);
        bookingDao.save(b);
        return b.getId() != null;
	}
	@Override
	public boolean removeFromBooking(Long userId, Long propertyId) {
		Booking b = bookingDao.findByUserIdAndPropertyId(userId, propertyId)
	            .orElseThrow(() -> new ApiException("Not in Booking"));
		bookingDao.delete(b);
		Property property = propertyDao.findById(propertyId).orElseThrow(() -> new ApiException("Property not found"));
	    property.setAvailable(true);
		return true;
		
	}
	@Override
	public List<Booking> getBookingByUser(Long userId) {
		return bookingDao.findByUserId(userId);
	}
	
	@Override
	public void updateBookingDate(Long userId, Long propertyId, LocalDate newDate) {
	    Booking b = bookingDao.findByUserIdAndPropertyId(userId, propertyId)
	        .orElseThrow(() -> new ApiException("Booking not found"));
	    
	    b.setBookedAt(newDate); // manually override bookedAt
	    bookingDao.save(b);
	}

}
