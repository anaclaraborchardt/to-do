import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { users } from "src/data/users";

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const logado = this.verificaLogin();

    if (logado) {
      return true;
    }

    alert("você precisa fazer o login");

    this.paginaLogin();

    return false;

  }

  verificaLogin(): boolean {
    const logadoCookie = this.getCookie('logado');

    const logado = logadoCookie === 'true';

    return logado;
  }

  paginaLogin(): void {

    window.location.href = 'http://localhost:4200/login';
  }

  private getCookie(nome: string): string | null {
    const cookie = document.cookie.match('(^|;)\\s*' + nome + '\\s*=\\s*([^;]+)');
    return cookie ? cookie.pop() : null;
  }
}