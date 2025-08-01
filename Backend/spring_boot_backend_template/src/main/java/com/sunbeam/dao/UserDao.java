package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
	
	boolean existsByEmail(String email);
	boolean existsByPhoneNumber(String phoneNumber);

}
