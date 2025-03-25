package com.UnirFP.Reto5.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioResponseDto {

    private String nombre;
    private String apellidos;
    private String rol;
}
