package com.UnirFP.Reto5.model.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VacanteDto {

	private Integer idVacante;
    private String nombre;
    private String descripcion;
    private Date fecha;
    private Double salario;
    private String estatus;
    private boolean destacado;
    private String imagen;
    private String detalles;
    private Integer idCategoria;
    private Integer idEmpresa;
    
}
