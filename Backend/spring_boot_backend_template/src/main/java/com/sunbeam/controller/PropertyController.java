package com.sunbeam.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.dto.PropertyRequestDTO;
import com.sunbeam.dto.PropertySummaryDTO;
import com.sunbeam.dto.UpdatePropertyDTO;
import com.sunbeam.entities.Property;
import com.sunbeam.services.PropertyService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/property")
@AllArgsConstructor
@CrossOrigin
public class PropertyController {
	private final PropertyService propertyService;
		
	@PostMapping("/addproperty")
	public ResponseEntity<?> addProperty (@RequestPart PropertyRequestDTO property , @RequestParam MultipartFile imageFile){
		System.out.println("In controller");
		System.out.println(property);
		System.out.println(imageFile.getOriginalFilename());
		try {
			
			return ResponseEntity.status(HttpStatus.CREATED).body(propertyService.addProperty(property,imageFile));
		}catch(IOException e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
			
		}
		
	}

	@GetMapping("/myproperties/{userId}")
    public ResponseEntity<?> getMyProperties(@PathVariable Long userId) {
        List<PropertySummaryDTO> properties = propertyService.getPropertiesByUserId(userId);
        return ResponseEntity.ok(properties);
    }


	@GetMapping("/LowToHigh")
	public ResponseEntity<?> getProperties(){
		return ResponseEntity.ok(propertyService.findAllByOrderByPriceAsc());
	}
	
    @GetMapping("HighToLow")
    public ResponseEntity<?> getAllPropertiesSortedByPriceInDesc(){
    	return ResponseEntity.ok(propertyService.findAllByOrderByPriceDesc());
    }
    
    @GetMapping("SortByDate")
    public ResponseEntity<?> getAllPropertiesSortedByDate(){
    	return ResponseEntity.ok(propertyService.findAllByOrderByDate());
    }
    
    @GetMapping("/state/{state}")
    public ResponseEntity<?> getAllPropertiesByState(@PathVariable String state){
    	return ResponseEntity.ok(propertyService.findAllPropertiesByState(state));
    }
    
    @GetMapping("/city/{city}")
    public ResponseEntity<?> getAllPropertiesByCity(@PathVariable String city){
    	return ResponseEntity.ok(propertyService.findAllPropertiesByCity(city));
    }
    
    @GetMapping("/bedrooms/{bedrooms}")
      public ResponseEntity<?> getAllPropertiesByBedrooms(@PathVariable int bedrooms){
    	return ResponseEntity.ok(propertyService.findAllPropertiesByBedrooms(bedrooms));
    } 
    
    @GetMapping("/isAvailable/{available}")
    public ResponseEntity<?> getAllPropertiesByAvailability(@PathVariable boolean available){
    	return ResponseEntity.ok(propertyService.findAllPropertiesByAvailability(available));
    } 
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProperty(@PathVariable Long id){
    	return ResponseEntity.ok(propertyService.findPropertyById(id));
    }

	@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id){
    	return ResponseEntity.ok(propertyService.deletePropertyById(id));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProperty(@PathVariable Long id , @RequestBody Property dto){
    	return ResponseEntity.ok(propertyService.updatePropertyById(id, dto));
    }


    
    @GetMapping("/myproperties/{userId}/{propertyId}")
    public ResponseEntity<?> getPropertyByUserAndId(@PathVariable Long userId, @PathVariable Long propertyId) {
        return ResponseEntity.ok(propertyService.findPropertyByIdAndOwnerId(userId, propertyId));
    }


    @PutMapping("/updateproperty/{userId}/{propertyId}")
    public ResponseEntity<?> updatePropertyByUser(
            @PathVariable Long userId,
            @PathVariable Long propertyId,
            @RequestBody UpdatePropertyDTO  dto)
    {

 
            String result = propertyService.updatePropertyByUser(userId, propertyId, dto);
            return ResponseEntity.ok(result);
       
    }

   @GetMapping("/listing")
   public ResponseEntity<?> getAllProperties(){
	   return ResponseEntity.ok(propertyService.getAllPropertiesAvailable());
   }


}
