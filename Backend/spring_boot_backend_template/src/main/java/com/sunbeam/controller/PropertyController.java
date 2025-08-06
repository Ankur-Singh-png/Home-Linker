package com.sunbeam.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entities.Property;
import com.sunbeam.services.PropertyService;
import com.sunbeam.dto.*;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/property")
@AllArgsConstructor
public class PropertyController {
	private final PropertyService propertyService;
		
	@PostMapping("/addproperty")
	public ResponseEntity<?> addProperty (@RequestPart Property property , @RequestParam MultipartFile imageFile){
		System.out.println("In controller");
		System.out.println(property);
		System.out.println(imageFile.getOriginalFilename());
		try {
			
			return ResponseEntity.status(HttpStatus.CREATED).body(propertyService.addProperty(property,imageFile));
		}catch(IOException e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
			
		}
		
	}

	@GetMapping("/myproperties/{userId}")
    public ResponseEntity<?> getMyProperties(@PathVariable Long userId) {
        List<PropertySummaryDTO> properties = propertyService.getPropertiesByUserId(userId);
        return ResponseEntity.ok(properties);
    }

}
