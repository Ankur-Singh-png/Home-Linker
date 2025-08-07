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
import com.sunbeam.dao.PropertyDao;
import com.sunbeam.dto.PropertyDto;
import com.sunbeam.dto.PropertySummaryDTO;
import com.sunbeam.entities.Property;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class PropertyServiceImpl implements PropertyService{
	private final PropertyDao propertydao;
	private final Cloudinary cloudinary;
	private final ModelMapper mapper;

	@Override
	public boolean addProperty(Property property, MultipartFile imageFile) throws IOException {
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


	    Property savedProperty = propertydao.save(property);
	    return true;
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
	
}
