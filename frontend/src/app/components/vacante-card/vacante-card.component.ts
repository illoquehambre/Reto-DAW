import { Component, Input } from '@angular/core';
import { IVacante } from '../../interfaces/ivacante';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vacante-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './vacante-card.component.html',
  styleUrl: './vacante-card.component.css'
})
export class VacanteCardComponent {
@Input() vacante!: IVacante;
}
