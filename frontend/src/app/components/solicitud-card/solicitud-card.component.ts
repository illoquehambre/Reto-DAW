import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISolicitud } from '../../interfaces/isolicitud';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitudResponse } from '../../interfaces/isolicitud-response';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-card.component.html',
  styleUrls: ['./solicitud-card.component.css']
})

export class SolicitudCardComponent {

  @Input() solicitud!: ISolicitudResponse;
  private solicitudService = inject(SolicitudService);

  async eliminarSolicitud() {
    try {
      await this.solicitudService.deleteSolicitud(this.solicitud.idSolicitud!);
      alert('Solicitud eliminada correctamente');
      window.location.reload();
    } catch (error) {
      alert('No se pudo eliminar la solicitud');
    }
  }
}