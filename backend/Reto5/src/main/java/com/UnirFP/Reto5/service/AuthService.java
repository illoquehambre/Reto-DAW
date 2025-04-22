package com.UnirFP.Reto5.service;

import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.dto.LoginRequest;
import com.UnirFP.Reto5.model.dto.RegistroUsuarioDto;
import com.UnirFP.Reto5.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;



    public Usuario signup(RegistroUsuarioDto input) {
        Usuario user = new Usuario();
        user.setNombre(input.getNombre());
        user.setPassword(passwordEncoder.encode(input.getContrasenia()));
        user .setEmail(input.getEmail());

        return userRepository.save(user);
    }

    public Usuario authenticate(LoginRequest input) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getContrasenia()
                )
        );
        Usuario usuario = userRepository.findByEmail(input.getEmail());

        System.out.println(usuario);
        return usuario;
    }
}
