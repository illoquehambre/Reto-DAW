package com.UnirFP.Reto5.model.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(of="idVacante")
@Builder
public class VacanteDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
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
