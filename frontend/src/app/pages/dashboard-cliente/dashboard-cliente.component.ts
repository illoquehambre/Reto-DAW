import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { PerfilComponent } from "../../components/perfil/perfil.component";
import { VacantesListComponent } from "../vacantes-list/vacantes-list.component";
import { CommonModule } from '@angular/common';
import { SolicitudesListComponent } from "../solicitudes-list/solicitudes-list.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [SidebarComponent, PerfilComponent, CommonModule, VacantesListComponent, SolicitudesListComponent],
  templateUrl: './dashboard-cliente.component.html',
  styleUrl: './dashboard-cliente.component.css'
})
export class DashboardClienteComponent {

 @Input() selectedMenu:string='perfil';


  router = inject(Router);

  vacantes(){
    this.router.navigate(['/vacantesListCli']);
  }

  solicitudes(){
    this.router.navigate(['/solicitudesList']);
  }

}
