package com.sunbeam.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.sunbeam.entities.Category;
import com.sunbeam.entities.Property;
import com.sunbeam.entities.User;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class PropertyServiceImpl implements PropertyService{
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
	        Map<String, Object> result = cloudinary.uploader().uploadLarge(imageFile.getBytes(), ObjectUtils.asMap(
	            "resource_type", "auto",
	            "chunk_size",4000000
	        ));
	    	System.out.println("image uploaded");
	        String imageUrl = result.get("secure_url").toString(); 
	        property.setImageURL(imageUrl);
	   
	    }
	    
	    Property propertyObj = mapper.map(property, Property.class);
	    User user = userdao.findById(property.getOwnerId()).orElseThrow(() -> new ApiException("user not found"));
	    propertyObj.setOwner(user);
	    Category category = categorydao.findById(property.getCategoryId()).orElseThrow(() -> new ApiException("category not found"));
	    propertyObj.setCategory(category);


	    Property savedProperty = propertydao.save(propertyObj);
	    return savedProperty.getId() != null;
	}


	@Override
    public List<PropertySummaryDTO> getPropertiesByUserId(Long userId) 
    {
        List<Property> properties = propertydao.findByOwnerId(userId);
        return properties.stream().
        		map(property->mapper.map(property, PropertySummaryDTO.class)).toList();
    }

	@Override
	public List<PropertyDto> findAllByOrderByPriceAsc() {
		 List<Property> list= propertydao.findAll(Sort.by(Sort.Direction.ASC,"price"));
		 return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllByOrderByPriceDesc() {
		List<Property> list = propertydao.findAll(Sort.by(Sort.Direction.DESC,"price"));
		return list.stream().map(property -> mapper.map(property ,PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllByOrderByDate() {
		List<Property> list=propertydao.findAll(Sort.by(Sort.Direction.ASC,"creationDate"));
		return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByState(String state) {
		List<Property> list= propertydao.findByStateIgnoreCase(state);
		return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByCity(String city) {
		List <Property> list=propertydao.findByCityIgnoreCase(city);
		return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByBedrooms(int bedrooms) {
		List<Property> list=propertydao.findByBedrooms(bedrooms);
		return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}

	@Override
	public List<PropertyDto> findAllPropertiesByAvailability(boolean available) {
		List<Property> list = propertydao.findByAvailable(available);
		return list.stream().map(property->mapper.map(property, PropertyDto.class)).toList();
	}


	@Override
	public PropertyDto findPropertyById(Long id) {
		Property property=propertydao.findById(id).orElseThrow(()-> new ApiException("Property not found"));
	    return mapper.map(property, PropertyDto.class);
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
