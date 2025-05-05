package com.UnirFP.Reto5.repository;

import com.UnirFP.Reto5.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
    
    // Obtener empresa por email del usuario
    @Query("SELECT e FROM Empresa e WHERE e.usuario.email = :email")
Empresa findByUsuarioEmail(@Param("email") String email);


}
