package com.UnirFP.Reto5.service;

import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.dto.UsuarioResponseDto;
import com.UnirFP.Reto5.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioResponseDto findByNombre(String name){
        Usuario usuario = usuarioRepository.findByNombre(name);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        UsuarioResponseDto dto = new UsuarioResponseDto(usuario.getNombre(), usuario.getApellidos(), usuario.getRol());
        return dto;
    }
}
