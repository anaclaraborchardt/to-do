import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';

interface Conta {
  id: string;
  nome: string;
  email: string;
  senha: string;
}


@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})

export class ContaComponent implements OnInit {
  users: user[];
  
  contaLogada: Conta;
  contaCadastrada: number;
  listaContas: Conta[] = [];
  cadastro: any = {};
  contaExistente: boolean = false;
  pagina: string = 'cadastro';
  meuParametro: string;
  nome: string;
  senha: string;
  email: string;
  cardPermissions: string;
  propertiesPermissions: string;

  constructor(private httpClient: HttpClient, private userRepository: UserRepository) {
    userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value;
      }
    });
  }
  ngOnInit(): void {

  }

  cadastrar(): void {
    const usuario: user = {
      meuParametro: this.meuParametro,
      nome: this.nome,
      senha: this.senha,
      email: this.email,
      cardPermissions: this.cardPermissions,
      propertiesPermissions: this.propertiesPermissions,
    }

    this.users.forEach(element => {
      if (element.meuParametro == this.meuParametro) {
        alert("usuario já cadastrado.")
      }
      else {
        this.httpClient.post<user[]>("http://localhost:4300/usuarios", usuario)
          .subscribe((req) => {
          })
        this.meuParametro= "";
        this.nome = "";
        this.senha = "";
        this.email = "";
        this.cardPermissions = "";
        this.propertiesPermissions=""

        alert("Usuário Cadastrado!");
      }
    });
  }
}
