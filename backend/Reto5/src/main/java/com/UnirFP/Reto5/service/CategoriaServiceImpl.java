package com.UnirFP.Reto5.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.UnirFP.Reto5.model.Categoria;
import com.UnirFP.Reto5.repository.CategoriaRepository;

public class CategoriaServiceImpl implements CategoriaService{
	
	@Autowired
	private CategoriaRepository crepo;

	@Override
	public Categoria findById(Integer clavePk) {
		return crepo.findById(clavePk).orElse(null);
	}

	@Override
	public List<Categoria> findAll() {
		return crepo.findAll();
	}

	@Override
	public int insertOne(Categoria entidad) {
		try {
			if (crepo.existsById(entidad.getIdCategoria())) {
				return 0;
			}else {
				crepo.save(entidad);
				return 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public int updateOne(Categoria entidad) {
		try {
			if (crepo.existsById(entidad.getIdCategoria())) {
				crepo.save(entidad);
				return 1;
			}else {
				return 0;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public int deleteOne(Integer clavePk) {
		try {
			if (crepo.existsById(clavePk)) {
				crepo.deleteById(clavePk);
				return 1;
			}else {
				return 0;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

}
