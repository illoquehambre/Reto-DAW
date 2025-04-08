package com.UnirFP.Reto5.model.dto;

import java.io.Serializable;
import java.util.Date;

import com.UnirFP.Reto5.model.Usuario;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(of="idEmpresa")
@Builder
public class EmpresaDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Integer idEmpresa;
    private String cif;
    private String nombreEmpresa;
    private String direccionFiscal;
    private String pais;
    private String email;
    
}
