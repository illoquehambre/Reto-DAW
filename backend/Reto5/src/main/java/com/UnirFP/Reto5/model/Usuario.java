package com.UnirFP.Reto5.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    private String email;
    private String nombre;
    private String apellidos;
    private String password;
    private int enabled;
    private Date fechaRegistro;
    private String rol;
}
