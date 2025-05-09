import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanteService } from '../../services/vacante.service';
import { IVacante } from '../../interfaces/ivacante';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { VacantesFilterComponent } from "../../components/vacantes-filter/vacantes-filter.component";

@Component({
  selector: 'app-vacantes-list-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, VacantesFilterComponent],
  templateUrl: './vacantes-list-cliente.component.html',
  styleUrl: './vacantes-list-cliente.component.css'
})
export class VacantesListClienteComponent implements OnInit{
  private vacanteService = inject(VacanteService);
  vacantes: IVacante[] = [];
  loading = true;
  error: string | null = null;
  router = inject(Router);
  
  async ngOnInit() {
    try {
       this.vacantes = await this.vacanteService.getAllVacantesCli();
    } catch (err) {
       console.error('Error al cargar vacantes', err);
       this.error = 'No se pudieron cargar las vacantes';
    } finally {
       this.loading = false;
    }
  }
  
  recibirVacantesFiltradas(listaFiltrada: IVacante[]) {
    this.vacantes = listaFiltrada; 
  }
  
  volver(){
     this.router.navigate(['/dashboardCliente']);
  }
}
