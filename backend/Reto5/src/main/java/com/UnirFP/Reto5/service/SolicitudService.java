package com.UnirFP.Reto5.service;

import java.util.List;

import com.UnirFP.Reto5.model.Solicitud;
import com.UnirFP.Reto5.model.dto.SolicitudUpdateDto;

public interface SolicitudService extends CrudGenerico<Solicitud,Integer>{

	List<Solicitud> findByVacante(int idVacante);
	List<Solicitud> findByUsuario(String email);
	int updateOne(SolicitudUpdateDto entidad);
}
