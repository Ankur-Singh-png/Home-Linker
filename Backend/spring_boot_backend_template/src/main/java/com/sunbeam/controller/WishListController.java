package com.sunbeam.controller;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.PropertyDto;
import com.sunbeam.entities.WishList;
import com.sunbeam.services.WishListService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/wishlist")
@AllArgsConstructor
public class WishListController {

    private final ModelMapper modelMapper;
    private WishListService wishListService;
    private UserDao userDao;

//    WishListController(ModelMapper modelMapper) {
//        this.modelMapper = modelMapper;
//    }

    // Get current user ID from authentication context
    private Long getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        return userDao.findByEmail(email).orElseThrow(() -> new ApiException("User not found")).getId();
    }

    @PostMapping("/{propertyId}")
    public ResponseEntity<?> addToWishlist(Authentication authentication, @PathVariable Long propertyId) {
        wishListService.addToWishlist(getCurrentUserId(authentication), propertyId);
        return ResponseEntity.ok("Added to wishlist");
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<?> removeFromWishlist(Authentication authentication, @PathVariable Long propertyId) {
        wishListService.removeFromWishlist(getCurrentUserId(authentication), propertyId);
        return ResponseEntity.ok("Removed from wishlist");
    }

    @GetMapping
    public ResponseEntity<List<PropertyDto>> getWishlist(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        List<WishList> list = wishListService.getWishlistByUser(userId);
       
       List<PropertyDto> dto =list.stream().map(property-> modelMapper.map(property, PropertyDto.class)).toList();
        
        return ResponseEntity.ok(dto);
    }
    
}
