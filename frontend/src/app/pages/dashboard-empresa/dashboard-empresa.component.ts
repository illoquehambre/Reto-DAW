import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarEmpresaComponent } from "../../components/sidebar-empresa/sidebar-empresa.component";


@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [RouterModule, SidebarEmpresaComponent],
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
}

