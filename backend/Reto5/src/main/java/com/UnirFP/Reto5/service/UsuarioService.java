package com.UnirFP.Reto5.service;

import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.dto.UsuarioResponseDto;
import com.UnirFP.Reto5.repository.UsuarioRepository;

import java.util.List;

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
    
    
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}
	
	public Usuario insertOne(Usuario entidad) {
		try {
			
			Usuario existe = usuarioRepository.findById(entidad.getEmail()).orElse(null);
			
			if (existe == null) {
				return usuarioRepository.save(entidad);
			} else {
				return null;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public int deleteOne(String email) {
		try {
			if (usuarioRepository.existsById(email)) {
				Usuario eliminado = usuarioRepository.findById(email).orElse(null);
				eliminado.setEnabled(0);
				usuarioRepository.save(eliminado);
				return 1;
			}else {
				return 0;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
}
