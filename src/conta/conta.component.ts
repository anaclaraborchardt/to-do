import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';




@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})

export class ContaComponent implements OnInit {
  users: user[];
  
  contaCadastrada: number;
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
    let usuarioCadastrado: boolean =true
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
        usuarioCadastrado = false
      }
      else  if (usuarioCadastrado == true) { {
        this.httpClient.post<user[]>("http://localhost:4300/usuarios", usuario)
          .subscribe((req) => {
          })
        this.meuParametro= "";
        this.nome = "";
        this.senha = "";
        this.email = "";
        this.cardPermissions = "";
        this.propertiesPermissions=""
        usuarioCadastrado = false;

      }
    }
    });
  }
}
