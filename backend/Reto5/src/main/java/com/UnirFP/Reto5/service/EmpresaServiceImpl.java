package com.UnirFP.Reto5.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnirFP.Reto5.model.Empresa;
import com.UnirFP.Reto5.repository.EmpresaRepository;

@Service
public class EmpresaServiceImpl implements EmpresaService{

	@Autowired
	private EmpresaRepository erepo;
	
	@Override
	public Empresa findById(Integer clavePk) {
		return erepo.findById(clavePk).orElse(null);
	}

	@Override
	public List<Empresa> findAll() {
		return erepo.findAll();
	}

	@Override
	public int insertOne(Empresa entidad) {
		try {
			if (erepo.existsById(entidad.getIdEmpresa())) {
				return 0;
			}else {
				erepo.save(entidad);
				return 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public int updateOne(Empresa entidad) {
		try {
			if (erepo.existsById(entidad.getIdEmpresa())) {
				erepo.save(entidad);
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
			if (erepo.existsById(clavePk)) {
				erepo.deleteById(clavePk);
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
