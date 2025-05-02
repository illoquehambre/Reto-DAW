// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './services//auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const expectedRole = route.data['rol'] as string;

    if (!this.authService.isAuthenticated()) {
      // Usuario no autenticado, redirigir al login
      return this.router.createUrlTree(['/login']);
    }

    if (!this.authService.hasRole(expectedRole)) {
      // Usuario no autorizado, redirigir al login
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }
}
