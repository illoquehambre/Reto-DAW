import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IVacanteResponse } from '../../interfaces/ivacante-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacante-detail-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacante-detail-empresa.component.html',
  styleUrl: './vacante-detail-empresa.component.css'
})
export class VacanteDetailEmpresaComponent {
  private vacanteService = inject(VacanteService);
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);

  vacante!: IVacanteResponse;
  error: string | null = null;
  loading: boolean = true;

  async ngOnInit(): Promise<void> {
    const id = this.ruta.snapshot.params['idVacante']; // Cambiado a idVacante
    
    if (!id) {
      this.error = 'No se proporcionó ID de vacante';
      this.loading = false;
      return;
    }

    try {
      this.vacante = await this.vacanteService.getById(id);
      
      if (!this.vacante) {
        this.error = 'No se encontró la vacante solicitada';
      }
    } catch (err) {
      console.error('Error al cargar vacante:', err);
      this.error = 'Error al cargar los detalles de la vacante';
    } finally {
      this.loading = false;
    }
  }

  volver(): void {
    this.router.navigate(['/dashboardEmpresa/vacantesList']); // Ruta absoluta
  }
}