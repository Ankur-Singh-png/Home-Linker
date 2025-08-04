package com.sunbeam.jwt;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.sunbeam.controller.PropertyController;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final PropertyController propertyController;
	@Autowired
	private JwtUtil jwtUtil;

    JwtFilter(PropertyController propertyController) {
        this.propertyController = propertyController;
    }
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("Getting token from header");
		String authHeader = request.getHeader("Authorization");
		System.out.println("Authorization Header: " + authHeader);
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		Authentication auth = null;
		if (validHeader) {
			String token = authHeader.replace("Bearer", "").trim();
			System.out.println("JWT Token: " + token);
			System.out.println("Going for validating token");
			auth = jwtUtil.validateToken(token);
			System.out.println("Token validated and retrurn authentciated object");
			
		}
		System.out.println(auth + "--"+ SecurityContextHolder.getContext().getAuthentication());
		
		//  attach auth/principal to current security context
		if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null)
			SecurityContextHolder.getContext().setAuthentication(auth);
		
		// invoke next filter in the chain
		System.out.println("Invoking next filter");
		filterChain.doFilter(request, response);
		
		// POST-PROCESSING (nothing to do here)
	}

}
