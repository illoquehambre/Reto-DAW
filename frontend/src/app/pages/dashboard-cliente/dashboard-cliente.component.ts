import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
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
