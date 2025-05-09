<<<<<<< HEAD
import { Component, EventEmitter, Output } from '@angular/core';
=======
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> versionArreglada

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {

<<<<<<< HEAD
@Output()  menuSelected = new EventEmitter<string>();
selectedMenu: string = 'perfil';

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    this.menuSelected.emit(menuKey);
=======

  router = inject(Router);

  irA(ruta: string) {
    this.router.navigate([`/dashboardAdmin/${ruta}`]);
>>>>>>> versionArreglada
  }
}
