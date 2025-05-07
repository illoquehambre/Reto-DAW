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

  async cancelarVacante() {
    if (!this.vacante.idVacante) return;

    this.vacanteService.delete(this.vacante.idVacante)
      .then(response => {
        if (response === 1) {
          alert("Vacante cancelada");
          this.vacante.estatus = "CANCELADA"; //Para que la vacante cancelada quede oculta sin tener que actualizar
        } else {
          alert("Error al cancelar la vacante");
        }
      });
  }
}

