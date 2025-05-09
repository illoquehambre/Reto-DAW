import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarAdminComponent } from "../../components/sidebar-admin/sidebar-admin.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [SidebarAdminComponent,RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
@Input() selectedMenu:string='usuarios';

  router = inject(Router);

  categorias(){
    this.router.navigate(['/categoriasList']);
  }

  usuarios(){
    this.router.navigate(['/usersList']);
  }
}
