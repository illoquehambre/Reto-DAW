import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';
import { IVacante } from '../../interfaces/ivacante';
import { CommonModule } from '@angular/common';
import { IEmpresa } from '../../interfaces/iempresa';
import { ICategoria } from '../../interfaces/icategoria';
import { EmpresaService } from '../../services/empresa.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-vacante-form',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './vacante-form.component.html',
  styleUrl: './vacante-form.component.css'
})
export class VacanteFormComponent {

  vacanteService = inject(VacanteService);
  empresaService = inject(EmpresaService);
  categoriaService = inject(CategoriaService);
  activatedRoute = inject(ActivatedRoute);
  miVacante!: IVacante;
  miEmpresa: IEmpresa;
  empresa: string;
  miCategoria: ICategoria;
  categoria: string;

  loading = true;
  error: string | null = null;

  constructor(){
    this.miEmpresa = {} as IEmpresa;
    this.empresa = "";
    this.miCategoria = {} as ICategoria;
    this.categoria = "";
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      console.log(params.id_vacante);
      if(params.id_vacante){
        try {
          this.miVacante = await this.vacanteService.getById(params.id_vacante);  
          this.miEmpresa = await this.empresaService.findByIdCliente(this.miVacante.idEmpresa);  
          this.empresa = this.miEmpresa.nombreEmpresa   
          this.miCategoria = await this.categoriaService.findByIdCliente(this.miVacante.idCategoria);
          this.categoria = this.miCategoria.nombre;
        } catch (err) {
          console.error('Error al cargar vacantes', err);
          this.error = 'No se pudo cargar los detalles de la vacante';
        } finally {
          this.loading = false;
        }
      }
    });
  }
}
