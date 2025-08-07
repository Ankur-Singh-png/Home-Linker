package com.sunbeam.services;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entities.User;

import lombok.AllArgsConstructor;
import com.sunbeam.dto.UpdateUserDTO;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService , UserDetailsService{
	
	private UserDao userDao;
	private ModelMapper mapper;
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDTO signUp(UserDTO userDTO) {
		if(userDao.existsByEmail(userDTO.getEmail()) || userDao.existsByPhoneNumber(userDTO.getPhoneNumber())) 
			throw new ApiException("Email or phone Number already exists");
		
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		User user = mapper.map(userDTO, User.class);
		return mapper.map(userDao.save(user),UserDTO.class);
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("In load username method before checking from database");
		User u = userDao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("No user exists!"));
		System.out.println("In load username method after checking from database");
		return u;
	}


	@Override
	public UserDTO getUserDTOById(Long id) {
		// TODO Auto-generated method stub
		
		User user = userDao.findById(id)
                .orElseThrow(() -> new ApiException("User not found"));

       
        UserDTO dto = mapper.map(user, UserDTO.class);
        dto.setPassword(""); 
        return dto;
	}

	@Override
	public void updateUserFromDTO(Long id, UpdateUserDTO dto) {
	    User user = userDao.findById(id)
	            .orElseThrow(() -> new ApiException("User not found"));

	    // Configure ModelMapper to ignore nulls
	    mapper.getConfiguration().setSkipNullEnabled(true);
	    mapper.map(dto, user); // This maps all non-null fields from dto to user

	    // Handle password separately to ensure it's encoded
	    if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
	        user.setPassword(passwordEncoder.encode(dto.getPassword()));
	    }

	    userDao.save(user);
	}

	@Override
	public UserDTO getUserDTOByEmail(String email) {
		User u = userDao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("No user exists!"));
		return mapper.map(u, UserDTO.class);
	}

	@Override
	public String deletePropertyById(Long id) {
		Property property=propertydao.findById(id).orElseThrow(()-> new ApiException("Property Not found"));
		propertydao.delete(property);
		return "Property Deleted successfully";
	}


	@Override
	public String updatePropertyById(Long id , PropertyDto dto) {
		Property property=propertydao.findById(id).orElseThrow(()-> new ApiException("Property Not found"));
		
		property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setAddress(dto.getAddress());
        property.setCity(dto.getCity());
        property.setState(dto.getState());
        property.setCountry(dto.getCountry());
        property.setPincode(dto.getPincode());
        property.setArea(dto.getArea());
        property.setPrice(dto.getPrice());
        property.setAvailable(dto.isAvailable());
        property.setBedrooms(dto.getBedrooms());
        property.setKitchens(dto.getKitchens());
        property.setBathrooms(dto.getBathrooms());
        property.setHalls(dto.getHalls());
        property.setTv(dto.isTv());
        property.setAc(dto.isAc());
        property.setWifi(dto.isWifi());
        property.setParking(dto.isParking());
        property.setFurnished(dto.isFurnised());
        property.setCreationDate(dto.getCreationDate());
        
        if (dto.getCategory() != null && dto.getCategory().getId() != null) {
            Category category = categoryDao.findById(dto.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            property.setCategory(category);
        }

        propertydao.save(property);
        
		return "Property Updated Successfully";
	}

}
