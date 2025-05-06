import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';
import { lastValueFrom } from 'rxjs';
import { IVacante } from '../../interfaces/ivacante';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacante-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacante-detail.component.html',
  styleUrl: './vacante-detail.component.css'
})
export class VacanteDetailComponent {

  private vacanteService = inject(VacanteService);
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);

  vacante!: IVacante;
  error: string | null = null;

  async ngOnInit(): Promise<void> {
    const id = this.ruta.snapshot.params['id'];
    try {
      this.vacante = await this.vacanteService.findById(id);


    } catch (err) {
      this.error = 'Error al cargar la vacante';
    }
  }


  volver(): void {
    this.router.navigate(['/vacantesList']);
  }
}
