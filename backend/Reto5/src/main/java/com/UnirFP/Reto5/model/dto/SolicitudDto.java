package com.UnirFP.Reto5.model.dto;

import java.io.Serializable;
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
public class SolicitudDto implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer idSolicitud;
    private Date fecha;
    private String archivo;
    private String comentarios;
    private int estado;
    private String curriculum;
    private Integer idVacante;
    private String email;
  
}
