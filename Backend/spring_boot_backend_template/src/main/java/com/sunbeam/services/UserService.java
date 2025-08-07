package com.sunbeam.services;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.UpdateUserDTO;

public interface UserService{
	UserDTO signUp(UserDTO userDTO);
	UserDTO getUserDTOById(Long id);
	void updateUserFromDTO(Long id, UpdateUserDTO  dto);
	UserDTO getUserDTOByEmail(String email);
}
