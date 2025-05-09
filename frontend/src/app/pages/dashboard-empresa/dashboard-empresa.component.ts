import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarEmpresaComponent } from "../../components/sidebar-empresa/sidebar-empresa.component";
import { VacantesEmpresaListComponent } from "../vacantes-empresa-list/vacantes-empresa-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [RouterModule, SidebarEmpresaComponent, VacantesEmpresaListComponent],
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

  perfil(){
    this.router.navigate(['/perfilEmpresa']);
  }

}
