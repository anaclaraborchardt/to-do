import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isContaCadastrada) {
      return true; // Permite a navegação
    } else {
      this.router.navigate(['/conta']); // Redireciona para a página de login
      return false; // Impede a navegação
    }
  }
}