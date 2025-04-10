package com.UnirFP.Reto5.service;

import java.util.List;

import com.UnirFP.Reto5.model.Solicitud;

public interface SolicitudService extends CrudGenerico<Solicitud,Integer>{

	List<Solicitud> findByVacante(int idVacante);
}
