package com.sunbeam.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.modelmapper.ModelMapper;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sunbeam.dao.PropertyDao;
import com.sunbeam.entities.Property;
import com.sunbeam.dto.PropertySummaryDTO;

import lombok.AllArgsConstructor;
import main.java.com.sunbeam.dto.PropertySummaryDTO;

@Service
@Transactional
@AllArgsConstructor
public class PropertyServiceImpl implements PropertyService{
	private final PropertyDao propertydao;
	private final Cloudinary cloudinary;
	private final ModelMapper modelMapper;

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
    public List<PropertySummaryDTO> getPropertiesByUserId(Long userId) {
        List<Property> properties = propertydao.findByOwnerId(userId);
        return properties.stream()
            .map(property -> modelMapper.map(property, PropertySummaryDTO.class))
            .collect(Collectors.toList());
    }

	


	

}
