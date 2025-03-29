package com.UnirFP.Reto5.repository;

import com.UnirFP.Reto5.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Usuario findByNombre(String name);
}
