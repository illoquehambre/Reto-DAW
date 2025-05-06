import { Component, inject, Input } from '@angular/core';
import { IVacante } from '../../interfaces/ivacante';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitud } from '../../interfaces/isolicitud';

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

  verSolicitudes() {
    this.router.navigate(['/solicitudes', this.vacante.idVacante]);
  }



}
