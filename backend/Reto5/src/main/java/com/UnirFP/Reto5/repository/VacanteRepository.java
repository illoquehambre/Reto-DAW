package com.UnirFP.Reto5.repository;

import com.UnirFP.Reto5.model.Vacante;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VacanteRepository extends JpaRepository<Vacante, Integer> {
	
	public List<Vacante> findByEmpresa_IdEmpresa(int idEmpresa);

	@Query("SELECT v FROM Vacante v WHERE v.empresa.usuario.email = :email")
	List<Vacante> findByEmpresaUsuarioEmail(@Param("email") String email);	public List<Vacante> findAllByEstatus(String estatus);
	public Vacante findFirstByCategoriaIdCategoria(int idCategoria);
}
