package com.UnirFP.Reto5.model.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioCreacionDto {

	private String email;
    private String nombre;
    private String apellidos;
    private String password;
    private String rol;
}
