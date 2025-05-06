import { Component, Input } from '@angular/core';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
@Input() solicitud!: ISolicitud;

}
