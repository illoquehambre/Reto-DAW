import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-empresa.component.html',
  styleUrl: './dashboard-empresa.component.css'
})
export class DashboardEmpresaComponent {

  router = inject(Router);

  newvacante(){
    this.router.navigate(['/vacanteNew']);
  }

  listvacantes(){
    this.router.navigate(['/vacantesList']);
  }

  solicitudes(){
    this.router.navigate(['/solicitudesList']);
  }
} 
