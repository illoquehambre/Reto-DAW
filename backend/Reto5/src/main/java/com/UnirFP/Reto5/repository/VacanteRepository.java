package com.UnirFP.Reto5.repository;

import com.UnirFP.Reto5.model.Vacante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanteRepository extends JpaRepository<Vacante, Integer> {
}
