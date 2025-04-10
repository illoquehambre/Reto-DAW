package com.UnirFP.Reto5.repository;

import com.UnirFP.Reto5.model.Solicitud;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {
	
	public List<Solicitud> findByVacante_IdVacante(int idVacante);
}
