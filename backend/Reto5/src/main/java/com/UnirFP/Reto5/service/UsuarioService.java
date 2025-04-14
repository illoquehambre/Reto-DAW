package com.UnirFP.Reto5.service;

import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.dto.UsuarioResponseDto;
import com.UnirFP.Reto5.repository.UsuarioRepository;

import java.security.SecureRandom;
import java.util.Date;
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
        UsuarioResponseDto dto = new UsuarioResponseDto(usuario.getEmail(),usuario.getNombre(), usuario.getApellidos(), usuario.getRol());
        return dto;
    }
    
    public Usuario findByEmail(String email){
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        
        return usuario;
    }
    
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}
	
	public Usuario insertOne(Usuario entidad, int esEmpresa) {
		try {
			
			Usuario existe = usuarioRepository.findById(entidad.getEmail()).orElse(null);
			
			if (existe == null) {
				if (esEmpresa == 2) {
					//entidad.setPassword(PasswordGenerator());
					entidad.setRol("CLIENTE");
				}
				if (esEmpresa == 1) {
					entidad.setPassword(PasswordGenerator());
					entidad.setRol("EMPRESA");
				}
				if (esEmpresa == 0) {
					//entidad.setPassword(PasswordGenerator());
					entidad.setRol("ADMON");
				}
				entidad.setEnabled(1);
				entidad.setFechaRegistro(new Date());
				return usuarioRepository.save(entidad);
			} else {
				return null;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public int updateOne(Usuario usuario) {
		try {
			if(usuarioRepository.existsById(usuario.getEmail())) {
				usuarioRepository.save(usuario);
				return 1;
			}else
				return 0;
			
		}catch(Exception e) {
			e.printStackTrace();
			return -1;
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
	
	public String PasswordGenerator() {
	    String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	    int PASSWORD_LENGTH = 12; 

	    SecureRandom random = new SecureRandom();
	    StringBuilder password = new StringBuilder(PASSWORD_LENGTH);

	    for (int i = 0; i < PASSWORD_LENGTH; i++) {
	            int index = random.nextInt(CHARACTERS.length());
	            password.append(CHARACTERS.charAt(index));
	        }

	    return password.toString();
	    
	}
}
