package com.UnirFP.Reto5.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Vacantes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vacante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idVacante;

    private String nombre;
    private String descripcion;
    private Date fecha;
    private Double salario;
    private String estatus;
    private boolean destacado;
    private String imagen;
    private String detalles;

    @ManyToOne
    @JoinColumn(name = "id_Categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Empresa empresa;
}

