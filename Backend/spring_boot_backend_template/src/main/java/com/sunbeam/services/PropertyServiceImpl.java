package com.sunbeam.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.PropertyDao;
import com.sunbeam.entities.Property;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PropertyServiceImpl implements PropertyService{
	private final PropertyDao propertydao;

	@Override
	public boolean addProperty(Property property) {
		// TODO Auto-generated method stub
		return false;
	}

}
