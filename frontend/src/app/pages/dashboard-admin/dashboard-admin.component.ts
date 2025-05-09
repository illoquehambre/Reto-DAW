<<<<<<< HEAD
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarAdminComponent } from "../../components/sidebar-admin/sidebar-admin.component";
import { EmpresaListComponent } from "../empresa-list/empresa-list.component";
import { UserListComponent } from "../user-list/user-list.component";
import { CategoriaListComponent } from "../categoria-list/categoria-list.component";
=======
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarAdminComponent } from "../../components/sidebar-admin/sidebar-admin.component";
>>>>>>> versionArreglada

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
<<<<<<< HEAD
  imports: [SidebarAdminComponent, EmpresaListComponent, UserListComponent, CategoriaListComponent],
=======
  imports: [SidebarAdminComponent,RouterModule],
>>>>>>> versionArreglada
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
