package com.sunbeam.services;
import com.sunbeam.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
	List<CategoryDTO> getAllCategories();
	CategoryDTO findById(Long id);

}
