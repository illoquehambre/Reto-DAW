// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private rol: string = '';

  saveAuthData(token: string, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', JSON.stringify(rol));
    this.rol = rol;
  }

  getRoles(): string {
    if (this.rol.length) return this.rol;
    const stored = localStorage.getItem('rol');
    this.rol = stored ? JSON.parse(stored) : [];
    return this.rol;
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
}
