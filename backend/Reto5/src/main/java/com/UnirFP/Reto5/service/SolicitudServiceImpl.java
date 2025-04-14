package com.UnirFP.Reto5.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnirFP.Reto5.model.Solicitud;
import com.UnirFP.Reto5.repository.SolicitudRepository;

@Service
public class SolicitudServiceImpl implements SolicitudService{

	@Autowired
	private SolicitudRepository srepo;
	
	@Override
	public Solicitud findById(Integer clavePk) {
		return srepo.findById(clavePk).orElse(null);
	}

	@Override
	public List<Solicitud> findAll() {
		return srepo.findAll();
	}
	
	@Override
	public List<Solicitud> findByVacante(int idVacante){
		return srepo.findByVacante_IdVacante(idVacante);
	}
	
	@Override
	public List<Solicitud> findByUsuario(String email){
		return srepo.findByUsuario_Email(email);
	}

	@Override
	public int insertOne(Solicitud entidad) {
		try {
			if (srepo.existsById(entidad.getIdSolicitud())) {
				return 0;
			}else {
				srepo.save(entidad);
				return 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public int updateOne(Solicitud entidad) {
		try {
			if (srepo.existsById(entidad.getIdSolicitud())) {
				srepo.save(entidad);
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
			if (srepo.existsById(clavePk)) {
				srepo.deleteById(clavePk);
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
