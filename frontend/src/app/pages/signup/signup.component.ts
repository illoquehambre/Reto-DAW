// src/app/auth/signup/signup.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, IAuthResponse } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ISignUp } from '../../interfaces/isignup';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  errorMessage: string | null = null;
  successMessage: string | null = null;

  async registerUser(signUpForm: NgForm) {
    if (signUpForm.invalid) { return; }
    const data: ISignUp = signUpForm.value;

    if (data.contrasenia !== data.confirmarContrasenia) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      // Envía al backend y recibe el modelo de usuario
      const user = await firstValueFrom(this.userService.register(data));

      // Opcional: mostrar mensaje de éxito
      this.successMessage = `¡Usuario ${user?.nombre} registrado correctamente!`;

      // Redirige al login para que el usuario inicie sesión
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Error en el registro';
      signUpForm.resetForm();
    }
  }
}
