package com.sunbeam.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactUsDto {
 @JsonProperty(access = Access.READ_ONLY)
 private Long id;
 @NotBlank
 private String first_name;
 @NotBlank
 private String last_name;
 @NotBlank
 private String description;
}
