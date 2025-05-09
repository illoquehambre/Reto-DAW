<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';
=======
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISolicitud } from '../../interfaces/isolicitud';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitudResponse } from '../../interfaces/isolicitud-response';
>>>>>>> versionArreglada

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
@Input() solicitud!: ISolicitud;

}
=======
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
>>>>>>> versionArreglada
