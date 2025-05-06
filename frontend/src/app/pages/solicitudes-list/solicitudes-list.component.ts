import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitud } from '../../interfaces/isolicitud';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { SolicitudCardComponent } from "../../components/solicitud-card/solicitud-card.component";

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SolicitudCardComponent],
  templateUrl: './solicitudes-list.component.html',
  styleUrl: './solicitudes-list.component.css'
})
export class SolicitudesListComponent {
  
  solicitudes: ISolicitud[] = [];
  loading = true;
  error: string | null = null;



  constructor(
    private usuarioService: UserService,
    private solicitudesService: SolicitudService
  ) {}

  ngOnInit() {
    this.usuarioService.loadUserProfile().pipe(
      
      tap(user => console.log('Usuario cargado:', user)),
  
     
      switchMap(user =>
        this.solicitudesService.getMisSolicitudes$()
      ),
 
      tap(sols => console.log('Solicitudes recibidas:', sols))
    )
    .subscribe({
      next: solicitudes => this.solicitudes = solicitudes,
      error: err => console.error('Error cargando solicitudes:', err)
    });
  }
}
