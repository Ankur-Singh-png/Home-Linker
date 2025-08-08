package com.sunbeam.services;
import com.sunbeam.dto.UserDTO;

import java.util.List;

import com.sunbeam.dto.UpdateUserDTO;

public interface UserService{
	UserDTO signUp(UserDTO userDTO);
	UserDTO getUserDTOById(Long id);
	void updateUserFromDTO(Long id, UpdateUserDTO  dto);
	UserDTO getUserDTOByEmail(String email);
	List<UserDTO> getAllUsers();
}
