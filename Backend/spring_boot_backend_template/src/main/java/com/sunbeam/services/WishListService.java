package com.sunbeam.services;

import java.util.List;

import com.sunbeam.entities.WishList;

public interface WishListService {
    void addToWishlist(Long userId, Long propertyId);
    void removeFromWishlist(Long userId, Long propertyId);
    List<WishList> getWishlistByUser(Long userId);
}
