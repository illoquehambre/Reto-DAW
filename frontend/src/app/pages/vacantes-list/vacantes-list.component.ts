import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanteService } from '../../services/vacante.service';
import { IVacante } from '../../interfaces/ivacante';
import { RouterModule } from '@angular/router';
import { VacanteCardComponent } from '../../components/vacante-card/vacante-card.component';
import { IVacanteResponse } from '../../interfaces/ivacante-response';


@Component({
  selector: 'app-vacantes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, VacanteCardComponent],
  templateUrl: './vacantes-list.component.html',
  styleUrls: ['./vacantes-list.component.css']
})
export class VacantesListComponent implements OnInit {

  private vacanteService = inject(VacanteService);

  vacantes: IVacanteResponse[] = [];
  loading = true;
  error: string | null = null;

  async ngOnInit() {
    try {
      const idEmpresa = 1; // Aquí puedes obtener el ID dinámicamente
      this.vacantes = await this.vacanteService.getVacantesByEmpresa(idEmpresa);
      console.log("Vacantes de la empresa:", this.vacantes);
    } catch (err) {
      console.error('Error al cargar vacantes', err);
      this.error = 'No se pudieron cargar las vacantes';
    } finally {
      this.loading = false;
    }
  }
}
