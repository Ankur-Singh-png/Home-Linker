package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.sunbeam.entities.Booking;

public interface BookingDao extends JpaRepository<Booking, Long>{
	List<Booking> findByUserId(Long userId);
    Optional<Booking> findByUserIdAndPropertyId(Long userId, Long propertyId);
    void deleteByUserIdAndPropertyId(Long userId, Long propertyId);
 
}
