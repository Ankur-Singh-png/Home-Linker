package com.sunbeam.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.ContactUsDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ContactUsDto;
import com.sunbeam.entities.ContactUs;
import com.sunbeam.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ContactUsServiceImpl implements ContactUsService {
   private final UserDao userDao;
   private final ContactUsDao contactDao;
   private final ModelMapper mapper;
@Override
public String addQuery(Long id, ContactUsDto dto) {
	User user= userDao.findById(id).orElseThrow(()->new ApiException("User not found"));
	ContactUs contact = mapper.map(dto, ContactUs.class);
	contact.setUserId(user);
	contactDao.save(contact);
	return "Query Added Successfully";
}
 
}
