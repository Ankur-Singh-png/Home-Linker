package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/property")
public class PropertyController {
	
	@GetMapping("/list")
	public ResponseEntity<?>  GetList() {
		return ResponseEntity.ok("fetched ok");
		
	}

}
