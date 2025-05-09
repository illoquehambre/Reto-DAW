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
      // guardamos token y roles
      this.authService.saveAuthData(resp.token, resp.rol);

      // suponiendo que solo hay un rol principal:
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
          
          // redirige a un dashboard genérico o a un “acceso denegado”
          this.router.navigate(['/']);
      }
    } catch (err) {
      alert("Usuario o contraseña incorrectos");
      loginForm.reset();
    }
  }
}
