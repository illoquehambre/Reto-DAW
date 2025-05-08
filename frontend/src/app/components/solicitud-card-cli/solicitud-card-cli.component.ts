import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';
import { ISolicitudUpdateDto } from '../../interfaces/i-solicitud-update-dto';

@Component({
  selector: 'app-solicitud-card-cli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card-cli.component.html',
  styleUrl: './solicitud-card-cli.component.css'
})
export class SolicitudCardCliComponent {
  @Input() solicitud!: ISolicitud;
  @Output() edit = new EventEmitter<ISolicitud>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.solicitud); 
  }

  onDelete() {
    if (confirm('¿Eliminar esta solicitud?')) {
      this.delete.emit(this.solicitud.idSolicitud);
    }
  }
}
