package com.sunbeam.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePropertyDTO {
    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private double area;
    private double price;
    private boolean available;
    private int bedrooms;
    private int kitchens;
    private int bathrooms;
    private int halls;
    private boolean tv;
    private boolean ac;
    private boolean wifi;
    private boolean parking;
    private boolean furnished;
    private Long categoryId;
}
