import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-empresa',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-empresa.component.html',
  styleUrl: './sidebar-empresa.component.css'
})
export class SidebarEmpresaComponent {

  router = inject(Router);

  irA(ruta: string) {
    this.router.navigate([`/dashboardEmpresa/${ruta}`]);
  }
}
