package com.UnirFP.Reto5.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Empresas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEmpresa;

    private String cif;
    private String nombreEmpresa;
    private String direccionFiscal;
    private String pais;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Usuario usuario;
}

