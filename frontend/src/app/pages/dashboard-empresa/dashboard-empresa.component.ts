<<<<<<< HEAD

import { Component, Input,inject } from '@angular/core';
import { SidebarEmpresaComponent } from "../../components/sidebar-empresa/sidebar-empresa.component";
import { VacantesEmpresaListComponent } from "../vacantes-empresa-list/vacantes-empresa-list.component";
import { Router } from '@angular/router';
=======
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarEmpresaComponent } from "../../components/sidebar-empresa/sidebar-empresa.component";
>>>>>>> versionArreglada


@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
<<<<<<< HEAD
  imports: [SidebarEmpresaComponent, VacantesEmpresaListComponent],
=======
  imports: [RouterModule, SidebarEmpresaComponent],
>>>>>>> versionArreglada
  templateUrl: './dashboard-empresa.component.html',
  styleUrl: './dashboard-empresa.component.css'
})
export class DashboardEmpresaComponent {

@Input() selectedMenu: string = 'vacantes';

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
<<<<<<< HEAD
}

=======

  perfil(){
    this.router.navigate(['/perfilEmpresa']);
  }

} 
>>>>>>> versionArreglada
