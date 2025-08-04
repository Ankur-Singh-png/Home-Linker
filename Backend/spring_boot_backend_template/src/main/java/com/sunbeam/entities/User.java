package com.sunbeam.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@SuppressWarnings("serial")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User implements UserDetails {
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
	private LocalDate dob;
	@CreationTimestamp
	@Column(name="creation_date")
	private LocalDate creationDate;
	@UpdateTimestamp
	@Column(name="updated_on")
	private LocalDate updatedOn;
	@Enumerated(EnumType.STRING)
	private UserRole userRole = UserRole.ROLE_USER;
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("In get authorites method");
		return List.of(new SimpleGrantedAuthority(this.userRole.name()));
	}
	@Override
	public String getUsername() {
		System.out.println("In get userName/useremail method");
		return this.email;
	}

}
