import { Component } from '@angular/core';
import { ISolicitud } from '../../interfaces/isolicitud';
import { EmpresaService } from '../../services/empresa.service';
import { SolicitudCardComponent } from "../../components/solicitud-card/solicitud-card.component";

@Component({
  selector: 'app-solicitudes-empresa-list',
  standalone: true,
  imports: [SolicitudCardComponent],
  templateUrl: './solicitudes-empresa-list.component.html',
  styleUrl: './solicitudes-empresa-list.component.css'
})
export class SolicitudesEmpresaListComponent {
solicitudesByEmpresa:ISolicitud[]=[];
errMesg='';

constructor(private empresaService:EmpresaService){
  
}

ngOnInit(): void {
  this.empresaService.getSolicitudesByUsuario().subscribe({
    next: sols => {
      this.solicitudesByEmpresa = sols;
      console.log("Solicitudes cargadas:", sols);
    },
    error: err => {
      console.error('Error al cargar vacantes:', err);
      this.errMesg = 'No se pudieron cargar las vacantes.';
    }
  });
}

}
