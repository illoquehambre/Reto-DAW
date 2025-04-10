package com.UnirFP.Reto5.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnirFP.Reto5.model.Vacante;
import com.UnirFP.Reto5.repository.VacanteRepository;

@Service
public class VacanteServiceImpl implements VacanteService{

	@Autowired
	private VacanteRepository vrepo;
	
	@Override
	public Vacante findById(Integer clavePk) {
		return vrepo.findById(clavePk).orElse(null);
	}
	
	@Override
	public List<Vacante> findByEmpresa(Integer idEmpresa){
		return vrepo.findByEmpresa_IdEmpresa(idEmpresa);
	}

	@Override
	public List<Vacante> findAll() {
		return vrepo.findAll();
	}

	@Override
	public int insertOne(Vacante entidad) {
		try {
			if (entidad.getIdVacante() == null) {
				entidad.setEstatus("CREADA");
				vrepo.save(entidad);
				return 1;
			}
			if (vrepo.existsById(entidad.getIdVacante())) {
				return 0;
			}else {
				entidad.setEstatus("CREADA");
				vrepo.save(entidad);
				return 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public int updateOne(Vacante entidad) {
		try {
			if (vrepo.existsById(entidad.getIdVacante())) {
				vrepo.save(entidad);
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
			if (vrepo.existsById(clavePk)) {
				Vacante cancelada = findById(clavePk);
				cancelada.setEstatus("CANCELADA");
				vrepo.save(cancelada);
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
