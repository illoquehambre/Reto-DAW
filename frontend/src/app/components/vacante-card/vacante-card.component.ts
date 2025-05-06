import { Component, inject, Input } from '@angular/core';
import { IVacante } from '../../interfaces/ivacante';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vacante-card',
  standalone: true,
  imports: [CommonModule, RouterModule], // Asegúrate de que RouterModule está aquí
  templateUrl: './vacante-card.component.html',
  styleUrls: ['./vacante-card.component.css']
})
export class VacanteCardComponent {
  @Input() vacante!: IVacante;
}
