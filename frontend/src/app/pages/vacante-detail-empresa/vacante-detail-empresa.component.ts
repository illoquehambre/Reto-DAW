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

  async ngOnInit(): Promise<void> {
    const id = this.ruta.snapshot.params['id'];
    try {
      this.vacante = await this.vacanteService.getById(id);
  
      
    } catch (err) {
      this.error = 'Error al cargar la vacante';
    }
  }
   

  volver(): void {
    this.router.navigate(['/vacantesList']);
  }
}
