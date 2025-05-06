
import { Component, Input,inject } from '@angular/core';
import { SidebarEmpresaComponent } from "../../components/sidebar-empresa/sidebar-empresa.component";
import { VacantesEmpresaListComponent } from "../vacantes-empresa-list/vacantes-empresa-list.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [SidebarEmpresaComponent, VacantesEmpresaListComponent],
  templateUrl: './dashboard-empresa.component.html',
  styleUrl: './dashboard-empresa.component.css'
})
export class DashboardEmpresaComponent {

@Input() selectedMenu: string = 'vacantes';
}


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

