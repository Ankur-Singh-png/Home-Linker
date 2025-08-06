package com.sunbeam.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entities.Property;

import com.sunbeam.dto.PropertySummaryDTO;

public interface PropertyService {
	boolean addProperty(Property property , MultipartFile imageFile) throws IOException;
	List<PropertySummaryDTO> getPropertiesByUserId(Long userId);

}
