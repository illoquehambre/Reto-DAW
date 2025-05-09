package com.UnirFP.Reto5.controller;

import com.UnirFP.Reto5.model.Categoria;
import com.UnirFP.Reto5.model.Empresa;
import com.UnirFP.Reto5.model.Solicitud;
import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.Vacante;
import com.UnirFP.Reto5.model.dto.EmpresaDto;
import com.UnirFP.Reto5.model.dto.LoginRequest;
import com.UnirFP.Reto5.model.dto.SolicitudDto;
import com.UnirFP.Reto5.model.dto.SolicitudUpdateDto;
import com.UnirFP.Reto5.model.dto.UsuarioResponseDto;
import com.UnirFP.Reto5.model.dto.VacanteDto;
import com.UnirFP.Reto5.service.CategoriaService;
import com.UnirFP.Reto5.service.EmpresaService;
import com.UnirFP.Reto5.service.SolicitudService;
import com.UnirFP.Reto5.service.UsuarioService;
import com.UnirFP.Reto5.service.VacanteService;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @Autowired
	private CategoriaService cservice;
    
    @Autowired
	private EmpresaService eservice;

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
    
    @GetMapping("/vacante/{idVacante}")
	public ResponseEntity<VacanteDto> unaVacante(@PathVariable int idVacante){
		Vacante vacante = vservice.findById(idVacante);
		VacanteDto vacanteDto = VacanteDto.builder()
    .idVacante(vacante.getIdVacante())
    .nombre(vacante.getNombre())
    .descripcion(vacante.getDescripcion())
    .fecha(vacante.getFecha())
    .salario(vacante.getSalario())
    .estatus(vacante.getEstatus())
    .destacado(vacante.isDestacado())
    .imagen(vacante.getImagen())
    .detalles(vacante.getDetalles())
    .idCategoria(vacante.getCategoria().getIdCategoria())
    .idEmpresa(vacante.getEmpresa().getIdEmpresa())
    .nombreCategoria(vacante.getCategoria().getNombre())
    .nombreEmpresa(vacante.getEmpresa().getNombreEmpresa())
    .pais(vacante.getEmpresa().getPais())
    .build();
		
		return new ResponseEntity<VacanteDto>(vacanteDto,HttpStatus.OK);
	}
    
    @GetMapping("/categorias")
	public ResponseEntity<List<Categoria>> todasCategorias(){
		return new ResponseEntity<List<Categoria>>(cservice.findAll(),HttpStatus.OK);
	}
    
    @GetMapping("/categoria/{idCategoria}")
	public ResponseEntity<Categoria> unaCategoria(@PathVariable int idCategoria){ 
		return new ResponseEntity<Categoria>(cservice.findById(idCategoria),HttpStatus.OK);
	}
    
    @GetMapping("/empresas")
	public ResponseEntity<List<EmpresaDto>> todasEmpresas(){
		List<Empresa> empresas = eservice.findAll();
		List<EmpresaDto> empresasDto = new ArrayList<>(); 
		
		for(Empresa empresa : empresas) {
			EmpresaDto empresaDto = new EmpresaDto(
					empresa.getIdEmpresa(),
					empresa.getCif(),
					empresa.getNombreEmpresa(),
					empresa.getDireccionFiscal(),
					empresa.getPais(),
					empresa.getUsuario().getEmail());
			empresasDto.add(empresaDto);
		}
		
		return new ResponseEntity<List<EmpresaDto>>(empresasDto,HttpStatus.OK);
	}
    
    @GetMapping("/empresa/{idEmpresa}")
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
    public ResponseEntity<Integer> nuevaSolicitud(@RequestBody SolicitudDto solicitudDto,@AuthenticationPrincipal Usuario currentUser){
    	
    	Vacante vacante = vservice.findById(solicitudDto.getIdVacante());
    	//Usuario usuario = usuarioService.findByEmail(solicitudDto.getEmail());
    	Usuario usuario = usuarioService.findByEmail(currentUser.getEmail());
    	
    	Solicitud solicitud = new Solicitud();
    	
    	//solicitud.setFecha(solicitudDto.getFecha());
    	solicitud.setFecha(new Date());
        solicitud.setArchivo(solicitudDto.getArchivo());
        solicitud.setComentarios(solicitudDto.getComentarios());
        //solicitud.setEstado(solicitudDto.getEstado());
        solicitud.setEstado(0);
        solicitud.setCurriculum(solicitudDto.getCurriculum());
        solicitud.setVacante(vacante);
        solicitud.setUsuario(usuario);
    	
    	switch(sservice.insertOne(solicitud)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 2: return new ResponseEntity<Integer>(2, HttpStatus.OK);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
    	}
    }
    
 
    @PutMapping("/solicitud")
    public ResponseEntity<Integer> updateSolicitud(@RequestBody SolicitudUpdateDto solicitud) {
    	 System.out.println("Recibido en backend: " + solicitud);
    	 System.out.println("== PUT recibido con ID: " + solicitud.getIdSolicitud());
        switch(sservice.updateOne(solicitud)) {
        case 1: return new ResponseEntity<Integer>(1, HttpStatus.OK);
		case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
		case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
		default: return null;
        }
        
    }

    
    @DeleteMapping("solicitud/{id}")
    public ResponseEntity<Integer> deleteSolicitud(@PathVariable Integer id) {
        switch(sservice.deleteOne(id)) {
        case 1: return new ResponseEntity<Integer>(1, HttpStatus.OK);
      		case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
      		case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
      		default: return null;
        }
       
    }
    
    @GetMapping("/solicitudes")
    public ResponseEntity<List<SolicitudDto>> getSolicitudesDelUsuario(@AuthenticationPrincipal Usuario currentUser) {
        String userId = currentUser.getEmail();
        List<Solicitud> solicitudes = sservice.findByUsuario(userId);
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
        
        return ResponseEntity.ok(solicitudesDto);
    }
}
    

