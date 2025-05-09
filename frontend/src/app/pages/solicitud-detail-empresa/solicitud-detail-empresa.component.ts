import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
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

  solicitud?: ISolicitudResponse;
  error = "";
  procesando = false;

  async ngOnInit(): Promise<void> {
    try {
      const idSolicitud = this.route.snapshot.paramMap.get('idSolicitud');
      if (!idSolicitud) throw new Error('ID no válido');
      
      const response = await this.solicitudService.getById(Number(idSolicitud));
      this.solicitud = response || undefined;
      if (!this.solicitud) this.error = "Solicitud no encontrada";
    } catch (error) {
      this.error = "Error al cargar la solicitud";
      console.error(error);
    }
  }

  // Versión ultra-minimalista
async asignarSolicitud(estado: number): Promise<void> {
  if (!this.solicitud?.idSolicitud) return;
  
  const resultado = await this.solicitudService.updateEstadoSolicitud(
    this.solicitud.idSolicitud,
    estado
  );
  if (resultado === 1) this.solicitud.estado = estado;
}

  volver(): void {
    this.router.navigate(['/dashboardEmpresa/solicitudes']);
  }
}