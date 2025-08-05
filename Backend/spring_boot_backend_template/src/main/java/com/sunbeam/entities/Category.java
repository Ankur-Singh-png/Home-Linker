package com.sunbeam.entities;

import java.time.LocalDate;
import java.util.ArrayList;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.util.*;

@NoArgsConstructor
@ToString(exclude = "properties")
@Getter
@Setter
@Entity
@Table(name = "categories")
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	@CreationTimestamp
	@Column(name="creation_date")
	private LocalDate creationDate;	
	
	
	@OneToMany(mappedBy = "category",cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Property> properties = new ArrayList<>();
    
	
	public void addProperty(Property property) {
    	properties.add(property);
    	property.setCategory(this);
    }
    public void removeProperty(Property property) {
    	properties.remove(property);
         property.setCategory(null);
     }

}
