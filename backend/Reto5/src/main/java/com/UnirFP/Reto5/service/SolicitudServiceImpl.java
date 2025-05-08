package com.UnirFP.Reto5.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnirFP.Reto5.model.Solicitud;
import com.UnirFP.Reto5.model.dto.SolicitudUpdateDto;
import com.UnirFP.Reto5.repository.SolicitudRepository;
import com.UnirFP.Reto5.repository.EmpresaRepository;


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
			Solicitud solicitud = srepo.findByUsuario_EmailAndVacante_IdVacante(entidad.getUsuario().getEmail(),entidad.getVacante().getIdVacante());
			if(solicitud != null) {
				return 2;
			}
			
			if (entidad.getIdSolicitud() == null) {
				srepo.save(entidad);
				return 1;
			}
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
	public int updateOne(SolicitudUpdateDto entidad) {
		try {
	        Optional<Solicitud> optional = srepo.findById(entidad.getIdSolicitud());
	        if (optional.isPresent()) {
	            Solicitud solicitud = optional.get();

	            solicitud.setArchivo(entidad.getArchivo());
	            solicitud.setComentarios(entidad.getComentarios());
	            solicitud.setCurriculum(entidad.getCurriculum());
	           
	            srepo.save(solicitud);
	            return 1;
	        } else {
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

}
