import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ICategoria } from '../../interfaces/icategoria';
import { VacanteService } from '../../services/vacante.service';
import { IEmpresa } from '../../interfaces/iempresa';
import { EmpresaService } from '../../services/empresa.service';
import { IVacante } from '../../interfaces/ivacante';
import { EmpresaCliService } from '../../services/empresa-cli.service';

@Component({
  selector: 'app-vacantes-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vacantes-filter.component.html',
  styleUrl: './vacantes-filter.component.css'
})
export class VacantesFilterComponent {

  categoriaService = inject(CategoriaService);
  vacanteService = inject(VacanteService);
  empresaService = inject(EmpresaCliService);
  arrCategoria: ICategoria[];
  arrEmpresa: IEmpresa[];

  @Output() listaFiltrada = new EventEmitter<IVacante[]>();
  @Output() listaReestablecer = new EventEmitter<IVacante[]>();

  constructor(){
    this.arrCategoria = [];
    this.arrEmpresa = [];
  }

  async ngOnInit(): Promise<void>{
    try{
      this.arrCategoria = await this.categoriaService.getAllCliente();
      this.arrEmpresa = await this.empresaService.getAllCliente();
    }catch(err){
      alert('Error al conectar a la API: ' + err);
    }
  }

  /*async getDataForm(formularioFiltro: NgForm){
      let filtrar = formularioFiltro.value;
      let vacantesFiltradas = await this.vacanteService.filtrarVacantes(filtrar);
      //this.vacanteService.filtrarVacantes(filtrar);
      this.listaFiltrada.emit(vacantesFiltradas);
      //formularioFiltro.resetForm();
    }*/

  async filtrar(formularioFiltro: NgForm){
    let filtrar = formularioFiltro.value;
    let vacantesFiltradas = await this.vacanteService.filtrarVacantesCli(filtrar);
    //this.vacanteService.filtrarVacantes(filtrar);
    this.listaFiltrada.emit(vacantesFiltradas);
    //formularioFiltro.resetForm();
  }

  async reestablecer(formularioFiltro: NgForm){
    formularioFiltro.resetForm();
    let vacantesFiltradas = await this.vacanteService.getAllVacantesCli();
    this.listaFiltrada.emit(vacantesFiltradas);
  }
}
