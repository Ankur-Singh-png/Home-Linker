package com.sunbeam.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entities.Property;

public interface PropertyService {
	boolean addProperty(Property property , MultipartFile imageFile) throws IOException;

}
