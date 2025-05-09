import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router,public authService: AuthService,) {}

  getDashboardRoute(): string {
    const rol = this.authService.getRoles();
  
    if (rol === 'CLIENTE') {
      return '/dashboardCliente';
    } else if (rol === 'EMPRESA') {
      return '/dashboardEmpresa';
    } else if (rol === 'ADMON') {
      return '/dashboardAdmin';
    } else {
      return '/'; 
    }
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
