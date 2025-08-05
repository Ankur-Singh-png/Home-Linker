package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Property;

public interface PropertyDao extends JpaRepository<Property, Long>{

}
