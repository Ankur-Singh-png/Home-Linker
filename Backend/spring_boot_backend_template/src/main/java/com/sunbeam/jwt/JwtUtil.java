package com.sunbeam.jwt;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import com.sunbeam.custom_exceptions.GlobalExceptionHandler;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
    
	@Value(value="${jwt.token.expiration.millis}")
	public long jwtExpiration;
	@Value(value="${jwt.token.secret}")
	public String jwtSecret;
	private SecretKey jwtKey;

   
	
	@PostConstruct
	public void init() {
		jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String createToken(Authentication auth) {
		System.out.println("In create token method");
		System.out.println("before casting" + auth.getClass() + auth.getPrincipal());
		//User user = (User)auth.getPrincipal();
		System.out.println( "After casting");
		String subject = auth.getName(); // user email
		System.out.println(subject+"subject");
		String roles = auth.getAuthorities().stream()	// user role e.g. ROLE_USER or ROLE_ADMIN
				.map(authority -> authority.getAuthority())
				.collect(Collectors.joining(","));
		String token = Jwts.builder()
			.subject(subject)
			.issuedAt(new Date())
			.expiration(new Date(System.currentTimeMillis() + jwtExpiration))
			.claim("role", roles)
			.signWith(jwtKey)
			.compact();
		System.out.println("At last of token creating method");
		return token;
	}
	
	public Authentication validateToken(String token) {
		System.out.println("In validating token method");
		JwtParser parser = Jwts.parser().verifyWith(jwtKey).build();
		Claims claims = parser
							.parseSignedClaims(token)
							.getPayload();
		String userEmail = claims.getSubject();
		String roles = (String) claims.get("userRole");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
		Authentication auth = new UsernamePasswordAuthenticationToken(userEmail, null, authorities);
		return auth;
	}
}
