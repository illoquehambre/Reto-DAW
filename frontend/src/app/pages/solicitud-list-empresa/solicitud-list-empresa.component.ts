import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitud } from '../../interfaces/isolicitud';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SolicitudCardComponent } from '../../components/solicitud-card/solicitud-card.component';

@Component({
  selector: 'app-solicitud-list-empresa',
  standalone: true,
  imports: [CommonModule, RouterModule, SolicitudCardComponent], // Asegúrate de que está aquí
  templateUrl: './solicitud-list-empresa.component.html',
  styleUrls: ['./solicitud-list-empresa.component.css']
})
export class SolicitudListEmpresaComponent implements OnInit {
  private solicitudService = inject(SolicitudService);
  private route = inject(ActivatedRoute);

  solicitudes: ISolicitud[] = [];
  loading = true;
  error: string | null = null;
  idVacante!: number;

  async ngOnInit() {
    this.idVacante = Number(this.route.snapshot.paramMap.get('idVacante'));

    try {
      this.solicitudes = await this.solicitudService.getSolicitudesByVacante(this.idVacante);
      console.log(this.solicitudes);
    } catch (err) {
      console.error('Error al cargar solicitudes', err);
      this.error = 'No se pudieron cargar las solicitudes';
    } finally {
      this.loading = false;
    }
  }
}
