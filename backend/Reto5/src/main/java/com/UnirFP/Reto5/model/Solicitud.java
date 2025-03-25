package com.UnirFP.Reto5.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Solicitudes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSolicitud;

    private Date fecha;
    private String archivo;
    private String comentarios;
    private int estado;
    private String curriculum;

    @ManyToOne
    @JoinColumn(name = "id_Vacante")
    private Vacante vacante;

    @ManyToOne
    @JoinColumn(name = "email")
    private Usuario usuario;
}