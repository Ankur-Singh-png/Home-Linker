package com.sunbeam.custom_exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class GlobalExceptionHandler {	
	
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> anyMethod(ApiException e){
		return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> anyMethod(Exception e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}

}
