package com.UnirFP.Reto5.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.UnirFP.Reto5.model.Categoria;
import com.UnirFP.Reto5.model.Empresa;
import com.UnirFP.Reto5.model.Solicitud;
import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.Vacante;
import com.UnirFP.Reto5.model.dto.EmpresaDto;
import com.UnirFP.Reto5.model.dto.SolicitudDto;
import com.UnirFP.Reto5.model.dto.VacanteDto;
import com.UnirFP.Reto5.repository.UsuarioRepository;
import com.UnirFP.Reto5.service.CategoriaService;
import com.UnirFP.Reto5.service.EmpresaService;
import com.UnirFP.Reto5.service.SolicitudService;
import com.UnirFP.Reto5.service.VacanteService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/empresa")
public class EmpresaController {
	
	@Autowired
	private UsuarioRepository uservice;
	
	@Autowired
	private VacanteService vservice;
	
	@Autowired
	private SolicitudService sservice;
	
	@Autowired
	private CategoriaService cservice;
	
	@Autowired
	private EmpresaService eservice;
	
	//EMPRESA
	@GetMapping("/{idEmpresa}")
	public ResponseEntity<EmpresaDto> unaEmpresa(@PathVariable int idEmpresa){
		Empresa empresa = eservice.findById(idEmpresa);
		EmpresaDto empresaDto = new EmpresaDto(
				empresa.getIdEmpresa(),
				empresa.getCif(),
				empresa.getNombreEmpresa(),
				empresa.getDireccionFiscal(),
				empresa.getPais(),
				empresa.getUsuario().getEmail());
		//return new ResponseEntity<Empresa>(eservice.findById(idEmpresa),HttpStatus.OK);
		return new ResponseEntity<EmpresaDto>(empresaDto,HttpStatus.OK);
	}
	
	@PostMapping("/")
	public ResponseEntity<Integer> altaEmpresa(@RequestBody EmpresaDto empresaDto){
		
		Usuario usuario = uservice.findByEmail(empresaDto.getEmail());
		
		Empresa empresa = new Empresa();
		empresa.setCif(empresaDto.getCif());
	    empresa.setNombreEmpresa(empresaDto.getNombreEmpresa());
	    empresa.setDireccionFiscal(empresaDto.getDireccionFiscal());
	    empresa.setPais(empresaDto.getPais());
	    empresa.setUsuario(usuario);
	    
		switch(eservice.insertOne(empresa)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@PutMapping("/")
	public ResponseEntity<Integer> editarEmpresa(@RequestBody EmpresaDto empresaDto){ 
		
		Usuario usuario = uservice.findByEmail(empresaDto.getEmail());
		
		Empresa empresa = new Empresa();
		empresa.setIdEmpresa(empresaDto.getIdEmpresa());
		empresa.setCif(empresaDto.getCif());
	    empresa.setNombreEmpresa(empresaDto.getNombreEmpresa());
	    empresa.setDireccionFiscal(empresaDto.getDireccionFiscal());
	    empresa.setPais(empresaDto.getPais());
	    empresa.setUsuario(usuario);
	    
		switch(eservice.updateOne(empresa)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	/*@DeleteMapping("/{idEmpresa}")
	public ResponseEntity<Integer> eliminarEmpresa(@PathVariable int idEmpresa){ 
		
		switch(eservice.deleteOne(idEmpresa)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}*/
	
	
	//VACANTES
	@GetMapping("/vacante/{idVacante}")
	public ResponseEntity<VacanteDto> unaVacante(@PathVariable int idVacante){
		Vacante vacante = vservice.findById(idVacante);
		VacanteDto vacanteDto = new VacanteDto(
				vacante.getIdVacante(),
			    vacante.getNombre(),
			    vacante.getDescripcion(),
			    vacante.getFecha(),
			    vacante.getSalario(),
			    vacante.getEstatus(),
			    vacante.isDestacado(),
			    vacante.getImagen(),
			    vacante.getDetalles(),
			    vacante.getCategoria().getIdCategoria(),
			    vacante.getEmpresa().getIdEmpresa());
		
		return new ResponseEntity<VacanteDto>(vacanteDto,HttpStatus.OK);
	}
	
	@GetMapping("/vacantes")
	public ResponseEntity<List<VacanteDto>> listaVacantes(){
		
		List<Vacante> vacantes = vservice.findAll();
		List<VacanteDto> vacantesDto = new ArrayList<>();
		
		
		for (Vacante vacante: vacantes) {
			VacanteDto vacanteDto = new VacanteDto();
			vacanteDto.setIdVacante(vacante.getIdVacante());
			vacanteDto.setNombre(vacante.getNombre());
			vacanteDto.setDescripcion(vacante.getDescripcion());
			vacanteDto.setFecha(vacante.getFecha());
			vacanteDto.setSalario(vacante.getSalario());
			vacanteDto.setEstatus(vacante.getEstatus());
			vacanteDto.setDestacado(vacante.isDestacado());
			vacanteDto.setImagen(vacante.getImagen());
			vacanteDto.setDetalles(vacante.getDetalles());
			vacanteDto.setIdCategoria(vacante.getCategoria().getIdCategoria());
			vacanteDto.setIdEmpresa(vacante.getEmpresa().getIdEmpresa());
			vacantesDto.add(vacanteDto);
		}
		
		//return new ResponseEntity<List<Vacante>>(vservice.findAll(),HttpStatus.OK);
		return new ResponseEntity<List<VacanteDto>>(vacantesDto,HttpStatus.OK);
	}
	
	@GetMapping("/vacantesEmpresa/{idEmpresa}")
	public ResponseEntity<List<VacanteDto>> listaVacantesPorEmpresa(@PathVariable int idEmpresa){
		
		List<Vacante> vacantes = vservice.findByEmpresa(idEmpresa);
		List<VacanteDto> vacantesDto = new ArrayList<>();
		
		
		for (Vacante vacante: vacantes) {
			VacanteDto vacanteDto = new VacanteDto();
			vacanteDto.setIdVacante(vacante.getIdVacante());
			vacanteDto.setNombre(vacante.getNombre());
			vacanteDto.setDescripcion(vacante.getDescripcion());
			vacanteDto.setFecha(vacante.getFecha());
			vacanteDto.setSalario(vacante.getSalario());
			vacanteDto.setEstatus(vacante.getEstatus());
			vacanteDto.setDestacado(vacante.isDestacado());
			vacanteDto.setImagen(vacante.getImagen());
			vacanteDto.setDetalles(vacante.getDetalles());
			vacanteDto.setIdCategoria(vacante.getCategoria().getIdCategoria());
			vacanteDto.setIdEmpresa(vacante.getEmpresa().getIdEmpresa());
			vacantesDto.add(vacanteDto);
		}
		//return new ResponseEntity<List<Vacante>>(vservice.findByEmpresa(idEmpresa),HttpStatus.OK);
		return new ResponseEntity<List<VacanteDto>>(vacantesDto,HttpStatus.OK);
	}
	
	@PostMapping("/nuevaVacante")
	public ResponseEntity<Integer> altaVacante(@RequestBody VacanteDto vacanteDto){
	
		Categoria categoria = cservice.findById(vacanteDto.getIdCategoria());
		Empresa empresa = eservice.findById(vacanteDto.getIdEmpresa());
		
		Vacante vacante = new Vacante();
		
		vacante.setNombre(vacanteDto.getNombre());
		vacante.setDescripcion(vacanteDto.getDescripcion());
		vacante.setFecha(vacanteDto.getFecha());
		vacante.setSalario(vacanteDto.getSalario());
		//vacante.setEstatus(vacanteDto.getEstatus());
		vacante.setDestacado(vacanteDto.isDestacado());
		vacante.setImagen(vacanteDto.getImagen());
		vacante.setDetalles(vacanteDto.getDetalles());
		vacante.setCategoria(categoria);
		vacante.setEmpresa(empresa);
		
		switch(vservice.insertOne(vacante)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
		
	}
	
	@PutMapping("/editarVacante")
	public ResponseEntity<Integer> editarVacante(@RequestBody VacanteDto vacanteDto){ 
		
		Categoria categoria = cservice.findById(vacanteDto.getIdCategoria());
		Empresa empresa = eservice.findById(vacanteDto.getIdEmpresa());
		
		Vacante vacante = new Vacante();
		
		vacante.setIdVacante(vacanteDto.getIdVacante());
		vacante.setNombre(vacanteDto.getNombre());
		vacante.setDescripcion(vacanteDto.getDescripcion());
		vacante.setFecha(vacanteDto.getFecha());
		vacante.setSalario(vacanteDto.getSalario());
		vacante.setEstatus(vacanteDto.getEstatus());
		vacante.setDestacado(vacanteDto.isDestacado());
		vacante.setImagen(vacanteDto.getImagen());
		vacante.setDetalles(vacanteDto.getDetalles());
		vacante.setCategoria(categoria);
		vacante.setEmpresa(empresa);
		
		switch(vservice.updateOne(vacante)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@DeleteMapping("/cancelarVacante/{idVacante}")
	public ResponseEntity<Integer> cancelarVacante(@PathVariable int idVacante){ 
		
		switch(vservice.deleteOne(idVacante)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	
	//SOLICITUDES
	@GetMapping("/solicitud/{idSolicitud}")
	public ResponseEntity<SolicitudDto> unaSolicitud(@PathVariable int idSolicitud){
		Solicitud solicitud = sservice.findById(idSolicitud);
		SolicitudDto solicitudDto = new SolicitudDto(
				solicitud.getIdSolicitud(),
				solicitud.getFecha(),
				solicitud.getArchivo(),
				solicitud.getComentarios(),
				solicitud.getEstado(),
				solicitud.getCurriculum(),
				solicitud.getVacante().getIdVacante(),
				solicitud.getUsuario().getEmail());
		
		return new ResponseEntity<SolicitudDto>(solicitudDto,HttpStatus.OK);
	}

	
	@GetMapping("/solicitudes")
	public ResponseEntity<List<SolicitudDto>> listaSolicitudes(){
		
		List<Solicitud> solicitudes = sservice.findAll();
		List<SolicitudDto> solicitudesDto = new ArrayList<>();
		
		for (Solicitud solicitud: solicitudes) {
			SolicitudDto solicitudDto = new SolicitudDto();
			solicitudDto.setIdSolicitud(solicitud.getIdSolicitud());
			solicitudDto.setFecha(solicitud.getFecha());
			solicitudDto.setArchivo(solicitud.getArchivo());
			solicitudDto.setComentarios(solicitud.getComentarios());
			solicitudDto.setEstado(solicitud.getEstado());
			solicitudDto.setCurriculum(solicitud.getCurriculum());
			solicitudDto.setIdVacante(solicitud.getVacante().getIdVacante());
			solicitudDto.setEmail(solicitud.getUsuario().getEmail());
			solicitudesDto.add(solicitudDto);
		}
		
		return new ResponseEntity<List<SolicitudDto>>(solicitudesDto,HttpStatus.OK);
	}
	
	
	@GetMapping("/solicitudes/{idVacante}")
	public ResponseEntity<List<SolicitudDto>> listaSolicitudesPorVacante(@PathVariable int idVacante){
		
		List<Solicitud> solicitudes = sservice.findByVacante(idVacante);
		List<SolicitudDto> solicitudesDto = new ArrayList<>();
		
		for (Solicitud solicitud: solicitudes) {
			SolicitudDto solicitudDto = new SolicitudDto();
			solicitudDto.setIdSolicitud(solicitud.getIdSolicitud());
			solicitudDto.setFecha(solicitud.getFecha());
			solicitudDto.setArchivo(solicitud.getArchivo());
			solicitudDto.setComentarios(solicitud.getComentarios());
			solicitudDto.setEstado(solicitud.getEstado());
			solicitudDto.setCurriculum(solicitud.getCurriculum());
			solicitudDto.setIdVacante(solicitud.getVacante().getIdVacante());
			solicitudDto.setEmail(solicitud.getUsuario().getEmail());
			solicitudesDto.add(solicitudDto);
		}
		
		return new ResponseEntity<List<SolicitudDto>>(solicitudesDto,HttpStatus.OK);
	}
	
	
	@PutMapping("/editarSolicitud")
	public ResponseEntity<Integer> editarSolicitud(@RequestBody SolicitudDto solicitudDto){ 
		
		Vacante vacante = vservice.findById(solicitudDto.getIdVacante());
		Usuario usuario = uservice.findByEmail(solicitudDto.getEmail());
		
		Solicitud solicitud = new Solicitud();
		
		solicitud.setIdSolicitud(solicitudDto.getIdSolicitud());
		solicitud.setFecha(solicitudDto.getFecha());
		solicitud.setArchivo(solicitudDto.getArchivo());
		solicitud.setComentarios(solicitudDto.getComentarios());
		solicitud.setEstado(solicitudDto.getEstado());
		solicitud.setCurriculum(solicitudDto.getCurriculum());
		solicitud.setVacante(vacante);
		solicitud.setUsuario(usuario);
		
		switch(sservice.updateOne(solicitud)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	
	@DeleteMapping("/eliminarSolicitud/{idSolicitud}")
	public ResponseEntity<Integer> eliminarSolicitud(@PathVariable int idSolicitud){ 
		
		switch(sservice.deleteOne(idSolicitud)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
}
