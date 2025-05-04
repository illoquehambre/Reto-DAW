package com.UnirFP.Reto5.controller;

import com.UnirFP.Reto5.model.Solicitud;
import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.Vacante;
import com.UnirFP.Reto5.model.dto.LoginRequest;
import com.UnirFP.Reto5.model.dto.SolicitudDto;
import com.UnirFP.Reto5.model.dto.UsuarioResponseDto;
import com.UnirFP.Reto5.model.dto.VacanteDto;
import com.UnirFP.Reto5.service.SolicitudService;
import com.UnirFP.Reto5.service.UsuarioService;
import com.UnirFP.Reto5.service.VacanteService;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private VacanteService vservice;
    
    @Autowired
    private SolicitudService sservice;


/*
    @PostMapping("/login")
    //public UsuarioResponseDto login(@RequestBody LoginRequest loginRequest) {
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    	/*PasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(encoder.encode("prueba"));*//*
    	try {
    		/*UsernamePasswordAuthenticationToken authToken =
    				new UsernamePasswordAuthenticationToken(loginRequest.getNombre(), loginRequest.getContrasenia());

    		Authentication auth = authenticationManager.authenticate(authToken);

    		SecurityContextHolder.getContext().setAuthentication(auth);
    		
    		//Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    		//System.out.println("Usuario autenticado: " + auth.getName());
    		//System.out.println("Roles: " + auth.getAuthorities());*/
    		/*
    		UsernamePasswordAuthenticationToken authToken =
    		        new UsernamePasswordAuthenticationToken(loginRequest.getNombre(), loginRequest.getContrasenia());

    		Authentication auth = authenticationManager.authenticate(authToken);
    		SecurityContextHolder.getContext().setAuthentication(auth);

    	
    		/*System.out.println("Usuario autenticado: " + auth.getName());
    		System.out.println("Roles: " + auth.getAuthorities());*/

    		//return  usuarioService.findByNombre(loginRequest.getNombre());/
    		//return new ResponseEntity<UsuarioResponseDto>(usuarioService.findByNombre(loginRequest.getNombre()),HttpStatus.OK);
    		//return new ResponseEntity<Authentication>(auth,HttpStatus.OK);
 /*
    	} catch (Exception e) {
    		//return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    		return new ResponseEntity<Exception>(e ,HttpStatus.UNAUTHORIZED);
    	}
    	
    	//return new ResponseEntity<LoginRequest>(loginRequest ,HttpStatus.UNAUTHORIZED);

    }
    */
    @GetMapping("/vacantes")
	public ResponseEntity<List<VacanteDto>> listaVacantes(){

		List<Vacante> vacantes = vservice.findAllCreada();

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

	@GetMapping("/vacantes/{id}")
	public ResponseEntity<VacanteDto> listaVacantes(@PathVariable int id){

		Vacante vacante = vservice.findById(id);

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



		//return new ResponseEntity<List<Vacante>>(vservice.findAll(),HttpStatus.OK);
		return new ResponseEntity<VacanteDto>(vacanteDto,HttpStatus.OK);
	}
    
    @GetMapping("/solicitudes/{email}")
    public ResponseEntity<List<SolicitudDto>> listaSolicitud(@PathVariable String email){
    	List<Solicitud> solicitudes = sservice.findByUsuario(email);
    	List<SolicitudDto> solicitudesDto = new ArrayList<>();
    	
    	for (Solicitud solicitud : solicitudes) {
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
    
    @PostMapping("/solicitud")
    public ResponseEntity<Integer> nuevaSolicitud(@RequestBody SolicitudDto solicitudDto){
    	
    	Vacante vacante = vservice.findById(solicitudDto.getIdVacante());
    	Usuario usuario = usuarioService.findByEmail(solicitudDto.getEmail());
    	
    	Solicitud solicitud = new Solicitud();
    	
    	solicitud.setFecha(solicitudDto.getFecha());
        solicitud.setArchivo(solicitudDto.getArchivo());
        solicitud.setComentarios(solicitudDto.getComentarios());
        solicitud.setEstado(solicitudDto.getEstado());
        solicitud.setCurriculum(solicitudDto.getCurriculum());
        solicitud.setVacante(vacante);
        solicitud.setUsuario(usuario);
    	
    	switch(sservice.insertOne(solicitud)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
    	}
    }
    
}
