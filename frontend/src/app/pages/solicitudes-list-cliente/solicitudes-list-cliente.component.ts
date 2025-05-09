import { Component, inject } from '@angular/core';
import { SolicitudCliService } from '../../services/solicitud-cli.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISolicitud } from '../../interfaces/isolicitud';
import { SolicitudCardCliComponent } from "../../components/solicitud-card-cli/solicitud-card-cli.component";
import { SolicitudUpdateFormComponent } from "../solicitud-update-form/solicitud-update-form.component";
import { ISolicitudUpdateDto } from '../../interfaces/i-solicitud-update-dto';


@Component({
  selector: 'app-solicitudes-list-cliente',
  standalone: true,
  imports: [SolicitudCardCliComponent, SolicitudUpdateFormComponent],
  templateUrl: './solicitudes-list-cliente.component.html',
  styleUrl: './solicitudes-list-cliente.component.css'
})
export class SolicitudesListClienteComponent {
  private solicitudService = inject(SolicitudCliService);
  private route = inject(ActivatedRoute);
  private router=inject(Router);

  solicitudes: ISolicitud[] = [];
  loading = true;
  error: string | null = null;
  idVacante!: number;
  solicitudSeleccionada: ISolicitudUpdateDto | null = null;

  async ngOnInit() {
    this.idVacante = Number(this.route.snapshot.paramMap.get('idVacante'));

    await this.cargarSolicitudes();
  }

  async cargarSolicitudes() {
    this.loading = true;
    try {
      this.solicitudes = await this.solicitudService.getAllSolicitudesByCliente();
      console.log(this.solicitudes);
    } catch (err) {
      console.error('Error al cargar solicitudes', err);
      this.error = 'No se pudieron cargar las solicitudes';
    } finally {
      this.loading = false;
    }
  }

  
  //DELETE solicitud
  eliminarSolicitud(id: number) {
    this.solicitudService.deleteSolicitud(id).subscribe({
      next: () => {
        this.solicitudes = this.solicitudes.filter(s => s.idSolicitud !== id);
      },
      error: () => alert('Error al eliminar solicitud')
    });
  }


//update formulario


abrirFormulario(solicitud: ISolicitud) {
  this.solicitudSeleccionada = {
    idSolicitud: solicitud.idSolicitud!,
    archivo: solicitud.archivo,
    comentarios: solicitud.comentarios,
    curriculum: solicitud.curriculum,
    idVacante: solicitud.idVacante
  };
}

guardarSolicitudEditada(dto: ISolicitudUpdateDto | null) {
  if (!dto) {
    this.solicitudSeleccionada = null;
    return;
  }

  this.solicitudService.updateSolicitud(dto).subscribe({
    next: async () => {
      console.log("Actualizado correctamente");
      
      this.solicitudSeleccionada = null;

      await this.cargarSolicitudes();
    },
    error: err => console.error("Error al actualizar:", err)
  });
}
}
