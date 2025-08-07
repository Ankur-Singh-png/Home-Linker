package com.sunbeam.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.dto.PropertyDto;
import com.sunbeam.dto.PropertyRequestDTO;
import com.sunbeam.dto.PropertySummaryDTO;
import com.sunbeam.dto.UpdatePropertyDTO;
import com.sunbeam.entities.Property;

public interface PropertyService {
	boolean addProperty(PropertyRequestDTO property, MultipartFile imageFile) throws IOException;

	List<PropertySummaryDTO> getPropertiesByUserId(Long userId);

	List<PropertyDto> findAllByOrderByPriceAsc();

	List<PropertyDto> findAllByOrderByPriceDesc();

	List<PropertyDto> findAllByOrderByDate();

	List<PropertyDto> findAllPropertiesByState(String state);

	List<PropertyDto> findAllPropertiesByCity(String city);

	List<PropertyDto> findAllPropertiesByBedrooms(int bedrooms);

	List<PropertyDto> findAllPropertiesByAvailability(boolean available);

	PropertyDto findPropertyById(Long id);

	public String deletePropertyById(Long id);

	public String updatePropertyById(Long id , Property dto);


	PropertyDto findPropertyByIdAndOwnerId(Long userId, Long propertyId);
	
	String updatePropertyByUser(Long userId, Long propertyId, UpdatePropertyDTO  dto);
}
