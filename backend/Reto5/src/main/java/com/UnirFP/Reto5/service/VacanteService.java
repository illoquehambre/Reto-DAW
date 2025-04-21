package com.UnirFP.Reto5.service;

import java.util.List;

import com.UnirFP.Reto5.model.Vacante;

public interface VacanteService extends CrudGenerico<Vacante,Integer>{

	List<Vacante> findByEmpresa(Integer idEmpresa);
	List<Vacante> findAllCreada();
	Vacante findByCategoria(Integer idCategoria);
}
