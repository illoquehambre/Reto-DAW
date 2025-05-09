import { Component, inject, Input } from '@angular/core';
import { IVacante } from '../../interfaces/ivacante';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';


@Component({
  selector: 'app-vacante-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vacante-card.component.html',
  styleUrls: ['./vacante-card.component.css']
})

export class VacanteCardComponent {
  router = inject(Router);
  vacanteService = inject(VacanteService);

  @Input() vacante!: IVacante;

<<<<<<< HEAD
}
=======
  async cancelarVacante() {
    if (!this.vacante.idVacante) return;
    
    if (!confirm('¿Estás seguro de cancelar esta vacante?')) return;

    try {
      const response = await this.vacanteService.delete(this.vacante.idVacante);
      if (response === 1) {
        this.vacante.estatus = "CANCELADA";
      } else {
        alert("Error al cancelar la vacante");
      }
    } catch (error) {
      alert("Ocurrió un error al procesar la solicitud");
      console.error(error);
    }
  }
}
>>>>>>> versionArreglada
