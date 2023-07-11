
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { user } from 'src/models/users/user';

import { UserRepository } from 'src/repositories/user.respository';
import { PermissionsService } from 'src/services/permissions.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  meuParametro: string;
  senha: string;
  users: Observable<user[]>;
  canAddTask: boolean;



  constructor(
    private userRepository: UserRepository,
    private permissions: PermissionsService
  ) {
    this.users = this.userRepository.getUsers().pipe(
      tap(users => console.log(users))
    );
  }

  ngOnInit(): void {
    if (localStorage.getItem('users') != null) {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
  }

  verificarLogin(): void {
    this.users.subscribe(users => {
      const usuarioEncontrado = users.find(
        user =>
          user.meuParametro === this.meuParametro && user.senha === this.senha
      );

      if (usuarioEncontrado) {
        alert('Login bem-sucedido');
        localStorage.setItem('logado', 'true');
        localStorage.setItem('meuParametro', usuarioEncontrado.meuParametro);

        this.setCookie('logado', 'true');

        this.defineUserCookies(usuarioEncontrado);
        this.permissions.setCardPermissions();
        this.paginaTarefas();
      } else {
        alert('Não foi possível fazer login.');
      }
    });
  }

  setCookie(nome: string, value: string): void {
    document.cookie = `${nome}=${value}`;
  }

  defineUserCookies(usuarioEncontrado: user): void {

    this.setCookie('meuParametro', usuarioEncontrado.meuParametro);
    this.setCookie('nome', usuarioEncontrado.nome);
    this.setCookie('senha', usuarioEncontrado.senha);
    this.setCookie('email', usuarioEncontrado.email);
    this.setCookie('cardPermissions', usuarioEncontrado.cardPermissions);
    this.setCookie('propertiesPermissions', usuarioEncontrado.propertiesPermissions);
  }

  paginaTarefas(): void {
    window.location.href = 'http://localhost:4200/tarefas';
  }
}

