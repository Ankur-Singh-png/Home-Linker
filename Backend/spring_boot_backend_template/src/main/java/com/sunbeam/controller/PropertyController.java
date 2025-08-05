package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entities.Property;

@RestController
@RequestMapping("/property")
public class PropertyController {
	
	@PostMapping("/addproperty")
	public ResponseEntity<?> addProperty(@RequestPart Property property , @RequestPart MultipartFile imageFile){
		System.out.println(property);
		System.out.println(imageFile);
		return null;
	}

}
