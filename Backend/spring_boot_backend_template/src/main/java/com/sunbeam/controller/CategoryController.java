package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.services.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/category")
@CrossOrigin
@AllArgsConstructor
public class CategoryController {
	private CategoryService categoryService;
	
	@GetMapping("/getAllCategories")
	public ResponseEntity<?> getAllCategories(){
		return ResponseEntity.ok(categoryService.getAllCategories());
	}
}
