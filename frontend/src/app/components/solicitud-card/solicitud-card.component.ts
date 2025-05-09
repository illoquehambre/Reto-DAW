import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISolicitud } from '../../interfaces/isolicitud';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.css']
})

export class SolicitudCardComponent {
onDelete() {
throw new Error('Method not implemented.');
}
onEdit() {
throw new Error('Method not implemented.');
}

  @Input() solicitud!: ISolicitud;
  private solicitudService = inject(SolicitudService);

  async eliminarSolicitud() {
    try {
      await this.solicitudService.deleteSolicitud(this.solicitud.idSolicitud!);
      alert('Solicitud eliminada correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar solicitud', error);
      alert('No se pudo eliminar la solicitud');
    }
  }
}
