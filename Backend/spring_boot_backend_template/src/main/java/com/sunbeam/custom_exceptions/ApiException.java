package com.sunbeam.custom_exceptions;

@SuppressWarnings("serial")
public class ApiException extends RuntimeException {
	public ApiException(String mesg) {
		super(mesg);
	}
}
