<<<<<<< HEAD
import { Component, EventEmitter, Output } from '@angular/core';
=======
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> versionArreglada

@Component({
  selector: 'app-sidebar-empresa',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-empresa.component.html',
  styleUrl: './sidebar-empresa.component.css'
})
export class SidebarEmpresaComponent {

<<<<<<< HEAD
@Output()  menuSelected = new EventEmitter<string>();
selectedMenu: string = 'vacantes';

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    this.menuSelected.emit(menuKey);
=======
  router = inject(Router);

  irA(ruta: string) {
    this.router.navigate([`/dashboardEmpresa/${ruta}`]);
>>>>>>> versionArreglada
  }
}
