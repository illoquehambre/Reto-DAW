import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-cliente.component.html',
  styleUrl: './dashboard-cliente.component.css'
})
export class DashboardClienteComponent {

  router = inject(Router);

  vacantes(){
    this.router.navigate(['/vacantesListCli']);
  }

  solicitudes(){
    this.router.navigate(['/solicitudesList']);
  }
}
