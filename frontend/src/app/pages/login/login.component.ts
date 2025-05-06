// login.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, IAuthResponse } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/ilogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  async getUser(loginForm: NgForm) {
    const credentials: ILogin = loginForm.value;
    try {
      const resp = await this.userService.login(credentials) as IAuthResponse;
    
      this.authService.saveAuthData(resp.token, resp.rol);

     
      const role = resp.rol;
      console.log(role);
      switch (role) {
        case 'ADMON':
          this.router.navigate(['/dashboardAdmin']);
          break;
        case 'CLIENTE':
          console.log("Redirecciona joder", role);
          this.router.navigate(['/dashboardCliente']);
          break;
        case 'EMPRESA':
          this.router.navigate(['/dashboardEmpresa']);
          break;
        default:
          
          
          this.router.navigate(['/']);
      }
    } catch (err) {
      console.error('Error tras login:', err);
    
      const token = localStorage.getItem('accessToken');
      const rol = localStorage.getItem('rol');
    
      if (token && rol) {
        console.warn('Login parece haber sido exitoso, pero algo más falló.');
        // Redirige igual si quieres
        this.router.navigate(['/dashboardDefault']);
      } else {
        alert("Usuario o contraseña incorrectos");
        loginForm.reset();
      }
    }
  }    
}
