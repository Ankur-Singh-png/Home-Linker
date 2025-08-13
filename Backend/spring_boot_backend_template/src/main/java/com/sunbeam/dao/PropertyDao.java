package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sunbeam.entities.Property;

public interface PropertyDao extends JpaRepository<Property, Long>
{
     List<Property> findByOwnerId(Long ownerId);
     
     List<Property> findByStateIgnoreCase(String state);
	 
     List<Property> findByCityIgnoreCase(String city);
     
     List<Property> findByBedrooms(int bedrooms);
     
     List<Property> findByAvailable(boolean available);

     Optional<Property> findByIdAndOwnerId(Long id, Long ownerId);
     
     @Query("SELECT p FROM Property p WHERE " +
  	       "LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
  	       "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
  	       "LOWER(p.address) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
  	       "LOWER(p.city) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
  	       "LOWER(p.state) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
  	       "LOWER(p.country) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
  	       "LOWER(p.pincode) LIKE LOWER(CONCAT('%', :keyword, '%'))")
     
      List<Property> searchByKeyword(@Param("keyword") String keyword);
 

}
