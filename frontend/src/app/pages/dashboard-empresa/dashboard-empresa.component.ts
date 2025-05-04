import { Component, Input } from '@angular/core';
import { SidebarEmpresaComponent } from "../../components/sidebar-empresa/sidebar-empresa.component";
import { VacantesEmpresaListComponent } from "../vacantes-empresa-list/vacantes-empresa-list.component";

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
