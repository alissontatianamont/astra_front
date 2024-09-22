import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const userRole = localStorage.getItem('rol'); // Obtener el rol del usuario
    const expectedRole = next.data.expectedRole; // Obtener el rol esperado de la ruta

    if (userRole === expectedRole) {
      return true; // Permitir el acceso
    }

    // Redirigir si el rol no coincide
    this.router.navigate(['dashboard']);
    return false;
  }
}

