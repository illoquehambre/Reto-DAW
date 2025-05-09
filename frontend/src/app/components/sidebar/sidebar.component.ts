import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  router = inject(Router);

  irA(ruta: string) {
    this.router.navigate([`/dashboardCliente/${ruta}`]);
  }
}