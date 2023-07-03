import { Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { user } from "src/models/users/user";
import { TesteService } from "./teste.service";

@Injectable()
    export class AuthGuardService implements CanActivate{
        constructor(private router: Router, private authService: TesteService) {}

  canActivate(): boolean {
    if (this.authService.isContaCadastrada) {
      return true; // Permite a navegação
    } else {
      this.router.navigate(['/conta']); // Redireciona para a página de login
      return false; // Impede a navegação
    }
  }

    }