package com.sunbeam.controller;

import java.io.IOException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entities.Property;
import com.sunbeam.services.PropertyService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/property")
@AllArgsConstructor
public class PropertyController {
	private final PropertyService propertyService;
	
	@PostMapping("/addproperty")
	public ResponseEntity<?> addProperty(@RequestPart Property property , @RequestPart MultipartFile imageFile) throws IOException{

//		System.out.println("In response entity");
//		System.out.println("property ac" +property.isAc());
//		System.out.println("prperty avaialable"+property.isAvailable());
//		System.out.println(property);
//		System.out.println(imageFile.getBytes());
//		System.out.println(imageFile.getContentType());
//		System.out.println(imageFile.getOriginalFilename());
		
		property.setImageName(imageFile.getOriginalFilename());
		property.setImageType(imageFile.getContentType());
		property.setImageData(imageFile.getBytes());
		return ResponseEntity.status(HttpStatus.CREATED).body(propertyService.addProperty(property));
	}

}
