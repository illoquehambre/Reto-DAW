import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';
import { ISolicitudResponse } from '../../interfaces/isolicitud-response';

@Component({
  selector: 'app-solicitud-detail-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-detail-empresa.component.html',
  styleUrls: ['./solicitud-detail-empresa.component.css']
})
export class SolicitudDetailEmpresaComponent {

  private solicitudService = inject(SolicitudService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  solicitud!: ISolicitudResponse;
  error: string = "";

  ngOnInit(): void {
    const idSolicitud = this.route.snapshot.paramMap.get('idSolicitud');
    if (idSolicitud) {
      this.solicitudService.getById(Number(idSolicitud))
        .then(response => {
          if (response) {
            this.solicitud = response;
          } else {
            this.error = "Solicitud no encontrada";
          }
        })
        .catch(() => {
          this.error = "Error al cargar la solicitud";
        });
    } else {
      this.error = "ID de solicitud no válido";
    }
  }

  volver(): void {
    this.router.navigate(["/dashboardEmpresa"]);
  }
}

