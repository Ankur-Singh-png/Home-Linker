package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Property;

public interface PropertyDao extends JpaRepository<Property, Long>
{
     List<Property> findByOwnerId(Long ownerId);
     
     List<Property> findByStateIgnoreCase(String state);
	 
     List<Property> findByCityIgnoreCase(String city);
     
     List<Property> findByBedrooms(int bedrooms);
     
     List<Property> findByAvailable(boolean available);

}
