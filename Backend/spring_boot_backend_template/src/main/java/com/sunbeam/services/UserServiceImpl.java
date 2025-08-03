package com.sunbeam.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entities.User;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	
	private UserDao userDao;
	private ModelMapper mapper;

	@Override
	public UserDTO signUp(UserDTO userDTO) {
		if(userDao.existsByEmail(userDTO.getEmail()) || userDao.existsByPhoneNumber(userDTO.getPhoneNumber())) 
			throw new ApiException("Email or phone Number already exists");
		
		User user = mapper.map(userDTO, User.class);
		return mapper.map(userDao.save(user),UserDTO.class);
	}

}
