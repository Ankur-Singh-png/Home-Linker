package com.sunbeam.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.CategoryDao;
import com.sunbeam.dao.PropertyDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.PropertyDto;
import com.sunbeam.dto.PropertyRequestDTO;
import com.sunbeam.dto.PropertySummaryDTO;
import com.sunbeam.dto.UpdatePropertyDTO;
import com.sunbeam.entities.Category;
import com.sunbeam.entities.Property;
import com.sunbeam.entities.User;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PropertyServiceImpl implements PropertyService {
	private final PropertyDao propertydao;
	private final UserDao userdao;
	private final CategoryDao categorydao;
	private final Cloudinary cloudinary;
	private final ModelMapper mapper;

	@Override
	public boolean addProperty(PropertyRequestDTO property, MultipartFile imageFile) throws IOException {
		if (imageFile != null && !imageFile.isEmpty()) {
			System.out.println("in service layer method");
			@SuppressWarnings("unchecked")
			Map<String, Object> result = cloudinary.uploader().uploadLarge(imageFile.getBytes(),
					ObjectUtils.asMap("resource_type", "auto", "chunk_size", 4000000));
			System.out.println("image uploaded");
			String imageUrl = result.get("secure_url").toString();
			property.setImageURL(imageUrl);

		}

		Property propertyObj = mapper.map(property, Property.class);
		User user = userdao.findById(property.getOwnerId()).orElseThrow(() -> new ApiException("user not found"));
		propertyObj.setOwner(user);
		Category category = categorydao.findById(property.getCategoryId())
				.orElseThrow(() -> new ApiException("category not found"));
		propertyObj.setCategory(category);

		Property savedProperty = propertydao.save(propertyObj);
		return savedProperty.getId() != null;
	}

	@Override
	public List<PropertySummaryDTO> getPropertiesByUserId(Long userId) {
		List<Property> properties = propertydao.findByOwnerId(userId);
		return properties.stream().map(property -> mapper.map(property, PropertySummaryDTO.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllByOrderByPriceAsc() {
		List<Property> list = propertydao.findAll(Sort.by(Sort.Direction.ASC, "price"));
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllByOrderByPriceDesc() {
		List<Property> list = propertydao.findAll(Sort.by(Sort.Direction.DESC, "price"));
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllByOrderByDate() {
		List<Property> list = propertydao.findAll(Sort.by(Sort.Direction.ASC, "creationDate"));
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByState(String state) {
		List<Property> list = propertydao.findByStateIgnoreCase(state);
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByCity(String city) {
		List<Property> list = propertydao.findByCityIgnoreCase(city);
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByBedrooms(int bedrooms) {
		List<Property> list = propertydao.findByBedrooms(bedrooms);
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByAvailability(boolean available) {
		List<Property> list = propertydao.findByAvailable(available);
		return list.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public PropertyDto findPropertyById(Long id) {
		Property property = propertydao.findById(id).orElseThrow(() -> new ApiException("Property not found"));
		return mapper.map(property, PropertyDto.class);
	}

	@Override
	public String deletePropertyById(Long id) {
		Property property = propertydao.findById(id).orElseThrow(() -> new ApiException("Property Not found"));
		propertydao.delete(property);
		return "Property Deleted successfully";
	}

	@Override
	public String updatePropertyById(Long id, Property dto) {

		Property property = propertydao.findById(id).orElseThrow(() -> new ApiException("Property Not found"));

		mapper.map(dto, property);

		// This ensures that category is also updated only if a valid category is
		// passed.
		if (dto.getCategory() != null && dto.getCategory().getId() != null) {
			Category category = categorydao.findById(dto.getCategory().getId())
					.orElseThrow(() -> new RuntimeException("Category not found"));
			property.setCategory(category);
		}

		propertydao.save(property);

		return "Property Updated Successfully";
	}



	
	@Override
	public PropertyDto findPropertyByIdAndOwnerId(Long userId, Long propertyId) {
	    Property property = propertydao.findByIdAndOwnerId(propertyId, userId)
	        .orElseThrow(() -> new ApiException("Property not found for the given user and id"));

	    return mapper.map(property, PropertyDto.class);
	}
	

	@Override
	public String updatePropertyByUser(Long userId, Long propertyId, UpdatePropertyDTO dto) {
	    //  Fetch property
	    Property property = propertydao.findById(propertyId)
	        .orElseThrow(() -> new ApiException("Property not found"));

	    // Step 2: Validate owner
	    if (!property.getOwner().getId().equals(userId)) {
	        throw new ApiException("User not authorized to update this property");
	    }
	    mapper.map(dto, property);
	    propertydao.save(property);
	    return "Property updated successfully";
	}

	@Override
	public List<PropertyDto> getAllPropertiesAvailable() {
		List<Property> list = propertydao.findByAvailable(true);
		return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}
	@Override
	public List<PropertyDto> SerachByKeyword(String keyword) {
		System.out.println(keyword);
		List<Property> properties = propertydao.searchByKeyword(keyword);
		properties.forEach(property -> System.out.println(property.toString()));
		return properties.stream().map(property -> mapper.map(property, PropertyDto.class)).toList();

	}

}
