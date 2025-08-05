package com.sunbeam.entities;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@ToString(exclude = {"category","owner"})
@Getter
@Setter
@Table(name = "property_details")
public class Property {
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	private String title;
	private String description;
	private String address;
	private String city;
	private String state;
	private String country;
	private String pincode;
	private double area;
	private double price;
	private boolean isAvailable;
	private int bedrooms;
	private int kitchens;
	private int bathrooms;
	private int halls;
	private boolean isTV;
	private boolean isAC;
	private boolean isWifi;
	private boolean isParking;
	private boolean isFurnished;
	
	
	@CreationTimestamp
	@Column(name="creation_date")
	private LocalDate creationDate;
	@UpdateTimestamp
	@Column(name="updated_on")
	private LocalDate updatedOn;
	
	private String imageName;
	
	private String imageType;
	@Lob
	private byte[] imageData;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
	
	
	
}
