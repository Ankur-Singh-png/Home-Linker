package com.sunbeam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ContactUsDto;
import com.sunbeam.services.ContactUsService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/contactus")
@AllArgsConstructor
public class ContactUsController {
	private final ContactUsService contactService;
    
	@PostMapping("/addQuery/{id}")
	public ResponseEntity<?> addQuery(@PathVariable Long id , @RequestBody ContactUsDto dto){
		return ResponseEntity.status(HttpStatus.CREATED).body(contactService.addQuery(id , dto));
	}
	
	@GetMapping("/getQuery")
	public ResponseEntity<?> getQueries(){
		return ResponseEntity.status(HttpStatus.CREATED).body(contactService.getAllQueries());
	}
}
