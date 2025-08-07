package com.sunbeam.dto;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	@NotBlank(message="Title cannot be Empty")
	private String title;
	@NotBlank(message="Description cannot be Empty")
	private String description;
	@NotBlank(message="Address cannot be Empty")
	private String address;
	@NotBlank(message="City cannot be Empty")
	private String city;
	@NotBlank(message="State cannot be Empty")
	private String state;
	@NotBlank(message="Country cannot be Empty")
	private String country;
	@NotNull(message = "Value must not be null")
	private String pincode;
	@NotBlank(message="Cannot be Empty")
	private double area;
	@NotNull(message = "Value must not be null")
	private double price;
	@NotNull(message = "Value must not be null")
	private boolean available;
	@NotNull(message = "Value must not be null")
	private int bedrooms;
	@NotNull(message = "Value must not be null")
	private int kitchens;
	@NotNull(message = "Value must not be null")
	private int bathrooms;
	@NotNull(message = "Value must not be null")
	private int halls;
	@NotNull(message = "Value must not be null")
	private boolean tv;
	@NotNull(message = "Value must not be null")
	private boolean ac;
	@NotNull(message = "Value must not be null")
	private boolean wifi;
	@NotNull(message = "Value must not be null")
	private boolean parking;
	@NotNull(message = "Value must not be null")
	private boolean furnised;
	@NotBlank(message="Date should not be null")
	private LocalDate creationDate;
	private String imageURL;;
	
	private CategoryDTO category;
	
}
