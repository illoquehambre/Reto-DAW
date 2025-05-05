import { Component, inject, Input } from '@angular/core';
import { IVacante } from '../../interfaces/ivacante';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-vacante-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacante-card.component.html',
  styleUrls: ['./vacante-card.component.css']
})
export class VacanteCardComponent {

  router = inject(Router);
  vacanteService = inject(VacanteService);
  @Input() vacante!: IVacante;


}
