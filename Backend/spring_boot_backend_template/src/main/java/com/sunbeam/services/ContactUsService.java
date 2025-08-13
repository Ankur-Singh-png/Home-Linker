package com.sunbeam.services;

import java.util.List;

import com.sunbeam.dto.ContactUsDto;

public interface ContactUsService {
   
	public String addQuery(Long id , ContactUsDto dto);
	
	List<ContactUsDto> getAllQueries();
}
