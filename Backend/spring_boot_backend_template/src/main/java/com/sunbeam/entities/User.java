package com.sunbeam.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length =20 ,name = "first_name")
	private String firstName;
	@Column(length =20 ,name = "last_name") 
	private String lastName;
	@Column(unique = true)
	private String email;
	@Column(length=10, unique = true ,nullable = false,name = "phone_number")
	private String phoneNumber;
	@Column(nullable = false)
	private String password;
	@Transient
	private String confirmPassword;
	private LocalDate dob;
	@CreationTimestamp
	@Column(name="creation_date")
	private LocalDate creationDate;
	@UpdateTimestamp
	@Column(name="updated_on")
	private LocalDate updatedOn;

}
