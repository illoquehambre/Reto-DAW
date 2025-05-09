// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly roleKey = 'rol';
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

  hasRole(rol: string): boolean {
    return this.getRoles().includes(rol);
  }

   getCurrentUserEmail(): string | null {
    return localStorage.getItem('email');
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.rol = '';
  }
}
