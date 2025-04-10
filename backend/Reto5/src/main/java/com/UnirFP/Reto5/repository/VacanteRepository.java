package com.UnirFP.Reto5.repository;

import com.UnirFP.Reto5.model.Vacante;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanteRepository extends JpaRepository<Vacante, Integer> {
	
	public List<Vacante> findByEmpresa_IdEmpresa(int idEmpresa); 
}
