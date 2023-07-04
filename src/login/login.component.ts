import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';
import { TesteService } from 'src/services/teste.service';

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

  

  constructor(private userRepository: UserRepository) {
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
      const usuarioEncontrado = users.find
      (user => user.meuParametro === this.meuParametro && user.senha === this.senha);

      if (usuarioEncontrado) {
        alert("Login bem-sucedido");
        window.location.replace("http://localhost:4200/tarefas")
        document.cookie = `meuParametro=${usuarioEncontrado.meuParametro}`;
        document.cookie = `nome=${usuarioEncontrado.nome}`;
        document.cookie = `senha=${usuarioEncontrado.senha}`;
        document.cookie = `email=${usuarioEncontrado.email}`;
        document.cookie = `cardPermissions=${usuarioEncontrado.cardPermissions}`;
        document.cookie = `propertiesPermissions=${usuarioEncontrado.propertiesPermissions}`;
      } else {
        alert("Não foi possível fazer login.");
      }
    });
  }
}

