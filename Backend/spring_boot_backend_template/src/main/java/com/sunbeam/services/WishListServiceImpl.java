package com.sunbeam.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.dao.PropertyDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dao.WishListDao;
import com.sunbeam.entities.Property;
import com.sunbeam.entities.User;
import com.sunbeam.entities.WishList;

import lombok.AllArgsConstructor;



@Service
@AllArgsConstructor
@Transactional
public class WishListServiceImpl implements WishListService {
    private WishListDao wishListDao;
    private UserDao userDao;
    private PropertyDao propertyDao;

    public void addToWishlist(Long userId, Long propertyId) {
        if (wishListDao.findByUserIdAndPropertyId(userId, propertyId).isPresent())
            throw new ApiException("Property already in wishlist.");
        User user = userDao.findById(userId).orElseThrow(() -> new ApiException("User not found"));
        Property property = propertyDao.findById(propertyId).orElseThrow(() -> new ApiException("Property not found"));
        WishList wl = new WishList();
        wl.setUser(user);
        wl.setProperty(property);
        wishListDao.save(wl);
    }

    public void removeFromWishlist(Long userId, Long propertyId) {
        WishList wl = wishListDao.findByUserIdAndPropertyId(userId, propertyId)
            .orElseThrow(() -> new ApiException("Not in wishlist"));
        wishListDao.delete(wl);
    }

    public List<WishList> getWishlistByUser(Long userId) {
        return wishListDao.findByUserId(userId);
    }
}
