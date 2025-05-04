// src/app/vacantes/vacante-details/vacante-details.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';
import { IVacante } from '../../interfaces/ivacante';

@Component({
  selector: 'app-vacante-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vacante-details.component.html',
  styleUrls: ['./vacante-details.component.css']
})
export class VacanteDetailsComponent implements OnInit {
  private vacanteService = inject(VacanteService);
  private route = inject(ActivatedRoute);

  vacante: IVacante | null = null;
  loading = true;
  error: string | null = null;

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : NaN;
    if (isNaN(id)) {
      this.error = 'ID de vacante inválido';
      this.loading = false;
      return;
    }

    try {
      this.vacante = await this.vacanteService.getVacanteById(id);
    } catch (err) {
      console.error('Error al cargar vacante', err);
      this.error = 'No se pudo cargar la vacante';
    } finally {
      this.loading = false;
    }
  }
}
