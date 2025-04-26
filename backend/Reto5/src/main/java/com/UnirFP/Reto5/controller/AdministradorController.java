package com.UnirFP.Reto5.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

import com.UnirFP.Reto5.model.Categoria;
import com.UnirFP.Reto5.model.Empresa;
import com.UnirFP.Reto5.model.Usuario;
import com.UnirFP.Reto5.model.Vacante;
import com.UnirFP.Reto5.model.dto.EmpresaDto;
import com.UnirFP.Reto5.model.dto.UsuarioCreacionDto;
import com.UnirFP.Reto5.model.dto.UsuarioResponseDto;
import com.UnirFP.Reto5.service.CategoriaService;
import com.UnirFP.Reto5.service.EmpresaService;
import com.UnirFP.Reto5.service.UsuarioService;
import com.UnirFP.Reto5.service.VacanteService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdministradorController {
	
	/*@Autowired
	private VacanteService vservice;*/
	
	@Autowired
	private EmpresaService eservice;
	
	@Autowired
	private UsuarioService uservice;
	
	@Autowired
	private CategoriaService cservice;
	
	//EMPRESA
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
	
	@PostMapping("/empresa")
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
	
	@PutMapping("/empresa")
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
	
	@DeleteMapping("/empresa/{idEmpresa}")
	public ResponseEntity<Integer> eliminarEmpresa(@PathVariable int idEmpresa){ 
		
		switch(eservice.deleteOne(idEmpresa)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	
	//USUARIO
	@GetMapping("/usuarios")
	public ResponseEntity<List<UsuarioResponseDto>> todosUsuarios(){
		List<Usuario> usuarios = uservice.findAll();
		List<UsuarioResponseDto> usuariosDto = new ArrayList<>();
		
		for(Usuario usuario : usuarios) {
			UsuarioResponseDto usuarioDto = new UsuarioResponseDto(
					usuario.getEmail(),
					usuario.getNombre(),
					usuario.getApellidos(),
					usuario.getRol(),
					usuario.getEnabled());
			usuariosDto.add(usuarioDto);
		}
		return new ResponseEntity<List<UsuarioResponseDto>>(usuariosDto,HttpStatus.OK);
	}
	
	
	@GetMapping("/usuario/{email}")
	public ResponseEntity<UsuarioResponseDto> unUsuario(@PathVariable String email){
		Usuario usuario = uservice.findByEmail(email);
		UsuarioResponseDto usuarioDto = new UsuarioResponseDto(
				usuario.getEmail(),
				usuario.getNombre(),
				usuario.getApellidos(),
				usuario.getRol(),
				usuario.getEnabled());
		//return new ResponseEntity<Empresa>(eservice.findById(idEmpresa),HttpStatus.OK);
		return new ResponseEntity<UsuarioResponseDto>(usuarioDto,HttpStatus.OK);
	}
	
	@PostMapping("/usuarioEmpresa")
	public ResponseEntity<Integer> altaUsuarioEmpresa(@RequestBody UsuarioResponseDto usuarioDto){
		
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setNombre(usuarioDto.getNombre());
		usuario.setApellidos(usuarioDto.getApellidos());
		   
		//return new ResponseEntity<Usuario>(uservice.insertOne(usuario, 1),HttpStatus.CREATED);
		switch(uservice.insertOne(usuario,1)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@PostMapping("/usuarioAdmin")
	public ResponseEntity<Integer> altaUsuarioAdmin(@RequestBody UsuarioResponseDto usuarioDto){
		
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setNombre(usuarioDto.getNombre());
		usuario.setApellidos(usuarioDto.getApellidos());
		
		//return new ResponseEntity<Usuario>(uservice.insertOne(usuario, 0),HttpStatus.CREATED);
		switch(uservice.insertOne(usuario,0)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@PostMapping("/usuarioCliente")
	public ResponseEntity<Integer> altaUsuarioCliente(@RequestBody UsuarioResponseDto usuarioDto){
		
		Usuario usuario = new Usuario();
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setNombre(usuarioDto.getNombre());
		usuario.setApellidos(usuarioDto.getApellidos());
		   
		//return new ResponseEntity<Usuario>(uservice.insertOne(usuario, 2),HttpStatus.CREATED);
		switch(uservice.insertOne(usuario,2)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@PutMapping("/usuario")
	public ResponseEntity<Integer> modificarUsuario(@RequestBody UsuarioCreacionDto usuarioDto){
		
		Usuario usuario = uservice.findByEmail(usuarioDto.getEmail());
		usuario.setNombre(usuarioDto.getNombre());
		usuario.setApellidos(usuarioDto.getApellidos());
		usuario.setPassword(usuarioDto.getPassword());
		usuario.setRol(usuarioDto.getRol());
		
		switch(uservice.updateOne(usuario)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@DeleteMapping("/usuario/{email}")
	public ResponseEntity<Integer> eliminarUsuario(@PathVariable String email){ 
		
		switch(uservice.deleteOne(email)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	//CATEGORIAS
	@GetMapping("/categorias")
	public ResponseEntity<List<Categoria>> todasCategorias(){
		return new ResponseEntity<List<Categoria>>(cservice.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/categoria/{idCategoria}")
	public ResponseEntity<Categoria> unaCategoria(@PathVariable int idCategoria){ 
		return new ResponseEntity<Categoria>(cservice.findById(idCategoria),HttpStatus.OK);
	}
	
	@PostMapping("/categoria")
	public ResponseEntity<Integer> altaCategoria(@RequestBody Categoria categoria){
		System.out.println(categoria);
		switch(cservice.insertOne(categoria)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@PutMapping("/categoria")
	public ResponseEntity<Integer> editarCategoria(@RequestBody Categoria categoria){
		/*Categoria categoria2 = new Categoria();
		categoria2.setNombre(categoria.getNombre());
		categoria2.setDescripcion(categoria.getDescripcion());*/
		switch(cservice.updateOne(categoria)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	@DeleteMapping("/categoria/{idCategoria}")
	public ResponseEntity<Integer> eliminarCategoria(@PathVariable int idCategoria){ 
		
		switch(cservice.deleteOne(idCategoria)) {
			case 1: return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
			case 0: return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			case -1: return new ResponseEntity<Integer>(-1, HttpStatus.CONFLICT);
			case 2: return new ResponseEntity<Integer>(2, HttpStatus.CONFLICT);
			default: return null;
		}
	}
	
	/*@GetMapping("/prueba/{idCategoria}")
	public ResponseEntity<Vacante> prueba(@PathVariable int idCategoria){
		return new ResponseEntity<Vacante>(vservice.findByCategoria(idCategoria), HttpStatus.OK);
	}*/
	
}
