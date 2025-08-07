package com.sunbeam.services;

import java.util.List;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.CategoryDao;
import com.sunbeam.dto.CategoryDTO;
import com.sunbeam.entities.Category;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService{
	private final CategoryDao categoryDao;
	private final ModelMapper mapper;
	@Override
	public List<CategoryDTO> getAllCategories() {
		List<Category> categories= categoryDao.findAll();
		return categories.stream()
		.map(category -> mapper.map(category, CategoryDTO.class)).collect(Collectors.toList());
	}
	@Override
	public CategoryDTO findById(Long id) {
		Category category = categoryDao.findById(id).orElseThrow(() -> new ApiException("category not found"));
		return mapper.map(category, CategoryDTO.class);
	}

}
