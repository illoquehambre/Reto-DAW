package com.UnirFP.Reto5.security;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class DataUserConfiguration{

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        // Se usa el email como username
        users.setUsersByUsernameQuery("select email as username, password, enabled from Usuarios where email=?");
        // Se asigna el rol (se añade el prefijo ROLE_) directamente desde la consulta
        users.setAuthoritiesByUsernameQuery("select email as username, CONCAT('ROLE_', rol) as authority from Usuarios where email=?");
        return users;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        // Endpoints públicos
                        .requestMatchers("/login", "/registro", "/public/**", "/api/login", "/api-docs/**", "/swagger-ui/**").permitAll()
                        // Cualquier otra URL requiere autenticación
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/inicioSesion")
                        .failureUrl("/login-error")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Para poder inyectar el AuthenticationManager en el controlador de login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
        return authConfiguration.getAuthenticationManager();
    }

	/*
	@Bean
	public InMemoryUserDetailsManager usersdetails() throws Exception{
		List<UserDetails> users=List.of(
				User
				.withUsername("user1")
				//.password("$2a$12$YUq1fO2Vbz.ONbIo./xmBeGCYFr5m4OLNC8H9HFafn4fpcOnUbqda")
				.password("{noop}user1")
				.roles("USERS")
				.build(),
				User
				.withUsername("user2")
				.password("{noop}user2")
				.roles("OPERATOR")
				.build(),
				User
				.withUsername("admin")
				.password("{noop}admin")
				.roles("USERS","ADMIN")
				.build());
		return new InMemoryUserDetailsManager(users);
	}
*/



}
