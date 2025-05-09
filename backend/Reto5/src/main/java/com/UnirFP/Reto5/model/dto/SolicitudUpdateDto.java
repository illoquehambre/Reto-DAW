package com.UnirFP.Reto5.model.dto;

import java.io.Serializable;

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
public class SolicitudUpdateDto implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer idSolicitud;
    private String archivo;
    private String comentarios;
    private String curriculum;
    private Integer idVacante;
  
}
