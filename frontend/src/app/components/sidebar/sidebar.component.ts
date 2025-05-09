<<<<<<< HEAD
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
=======
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
>>>>>>> versionArreglada

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

<<<<<<< HEAD
@Output()  menuSelected = new EventEmitter<string>();
selectedMenu: string = 'perfil';

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    this.menuSelected.emit(menuKey);
=======
  router = inject(Router);

  irA(ruta: string) {
    this.router.navigate([`/dashboardCliente/${ruta}`]);
>>>>>>> versionArreglada
  }
}
