package com.sunbeam.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserBookingDto {
    private Long propertyId;
    private String title;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private int area;
    private int bedrooms;
    private int kitchens;
    private int bathrooms;
    private int halls;
    private double price;
    private boolean available;
    private boolean tv;
    private boolean ac;
    private boolean wifi;
    private boolean parking;
    private boolean furnised;
    private String imageURL;
    private LocalDate bookedAt; 
    private String categoryTitle;
}
