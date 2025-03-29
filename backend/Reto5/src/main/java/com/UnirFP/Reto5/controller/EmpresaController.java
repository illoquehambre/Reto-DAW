package com.UnirFP.Reto5.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.UnirFP.Reto5.model.Categoria;
import com.UnirFP.Reto5.model.Empresa;
import com.UnirFP.Reto5.model.Vacante;
import com.UnirFP.Reto5.model.dto.VacanteDto;
import com.UnirFP.Reto5.service.CategoriaService;
import com.UnirFP.Reto5.service.EmpresaService;
import com.UnirFP.Reto5.service.VacanteService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/empresa")
public class EmpresaController {
	
	@Autowired
	private VacanteService vservice;
	
	@Autowired
	private CategoriaService cservice;
	
	@Autowired
	private EmpresaService eservice;
	
	@GetMapping("/vacantes")
	public ResponseEntity<List<Vacante>> listaVacantes(){
		return new ResponseEntity<List<Vacante>>(vservice.findAll(),HttpStatus.OK);
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
		vacante.setEstatus(vacanteDto.getEstatus());
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

}
