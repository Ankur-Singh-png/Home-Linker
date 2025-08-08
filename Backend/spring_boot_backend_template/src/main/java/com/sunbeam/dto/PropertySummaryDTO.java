package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PropertySummaryDTO
{
    private Long id;
    private String title;
    private String city;
    private String state;
    private double price;
    private boolean isAvailable;
    private String imageURL;


}
