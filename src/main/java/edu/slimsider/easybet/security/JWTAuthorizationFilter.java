package edu.slimsider.easybet.security;

import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import static edu.slimsider.easybet.security.SecurityConstants.*;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private UserService userService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(authenticationManager);
        this.userService = userService;
    }

    private List<String> disabledIds = new LinkedList<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String header = request.getHeader(HEADER_STRING);

        try {
            if(header==null || !header.startsWith(TOKEN_PREFIX)) {
                filterChain.doFilter(request, response);
                return;
            }

            UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
            String token = Jwts.builder()
                    .setSubject(((User)authenticationToken.getPrincipal()).getUsername())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .setId(UUID.randomUUID().toString())
                    .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                    .compact();
            response.addHeader("Access-Control-Expose-Headers", HEADER_STRING);
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        }
        catch (JwtException e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().print("Authorization has failed. Your token was invalid or has been expired. Please try to re-login");
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            String username, id;
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET.getBytes())
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();
            username = claims.getSubject();
            id = claims.getId();
            if(disabledIds.size()>1_000_000) {
                disabledIds.clear();
            }
            if(disabledIds.contains(id)) {
                throw new JwtException("Token has been disabled");
            }
            disabledIds.add(id);
            if (username != null) {
                User user = userService.getUser(username);
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getValue());
                List authorities = new LinkedList() {{add(authority);}};
                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            }
        }
        return null;
    }
}
