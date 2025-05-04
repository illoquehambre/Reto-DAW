package com.UnirFP.Reto5.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegistroUsuarioDto {
    @NotBlank
    @Size(min = 4, max = 50)
    String nombre;

    @NotBlank
    @Size(min = 4, max = 50)
    String apellidos;

    @Email
    @NotBlank
    String email;

    @NotBlank
    @Size(min = 6, max = 100)
    String contrasenia;

    @NotBlank
    @Size(min = 6, max = 100)
    private String confirmarContrasenia;
}
