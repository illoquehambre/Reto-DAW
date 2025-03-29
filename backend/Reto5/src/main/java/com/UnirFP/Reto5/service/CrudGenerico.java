package com.UnirFP.Reto5.service;

import java.util.List;

public interface CrudGenerico<E,ID> {

	E findById(ID clavePk);
	List<E> findAll();
	int insertOne(E entidad);
	int updateOne(E entidad);
	int deleteOne(ID clavePk);
}
