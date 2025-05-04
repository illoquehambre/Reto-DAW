package com.UnirFP.Reto5.controller;

import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.dto.LoginRequest;
import com.UnirFP.Reto5.model.dto.LoginResponse;
import com.UnirFP.Reto5.model.dto.RegistroUsuarioDto;
import com.UnirFP.Reto5.service.AuthService;
import com.UnirFP.Reto5.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@RestController
public class AuthenticationController {

   @Autowired
   private  JwtService jwtService;

    @Autowired
    private  AuthService authenticationService;



/*
    @PostMapping("/signup")
    public ResponseEntity<Usuario> register(@RequestBody RegistroUsuarioDto registerUserDto) {
        Usuario registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }
*/
    @PostMapping("/signup")
    public ResponseEntity<Usuario> signup(@RequestBody RegistroUsuarioDto dto) {
        if (authenticationService.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        if (!dto.getContrasenia().equals(dto.getConfirmarContrasenia())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }

        return  ResponseEntity.ok(authenticationService.signup(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest loginUserDto) {
    	System.out.println(loginUserDto);
        Usuario authenticatedUser = authenticationService.authenticate(loginUserDto);
        System.out.println(authenticatedUser);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRol(authenticatedUser.getRol());
        return ResponseEntity.ok(loginResponse);
    }
}